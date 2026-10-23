import { NextResponse } from 'next/server';
import { QuoteStatus, OrderStatus, PaymentStatus, FulfillmentMethod } from '@/app/generated/prisma/enums';
import { getCurrentUser } from '@/app/api/services/auth/guards';
import { prisma } from '@/app/lib/prisma';


interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await context.params;

    const quote = await prisma.quote.findUnique({
      where: { id },
      include: { inquiry: true },
    });

    if (!quote || quote.status !== QuoteStatus.SENT) {
      return NextResponse.json({ error: 'Valid quote not found' }, { status: 404 });
    }

    if (quote.expiresAt && quote.expiresAt < new Date()) {
      await prisma.quote.update({ where: { id }, data: { status: QuoteStatus.EXPIRED } });
      return NextResponse.json({ error: 'This quotation has expired.' }, { status: 400 });
    }

    // Verify ownership via inquiry email or customerId
    if (quote.inquiry.customerId && quote.inquiry.customerId !== user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Convert quote items into order items snapshot
    const quoteItems = quote.items as Array<{ description: string; quantity: number; unitPrice: number; lineTotal: number }>;
    const orderItemsData = quoteItems.map((item) => ({
      productName: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.lineTotal,
      descriptionSnapshot: `Bespoke Quote Reference: ${quote.quoteNumber}`,
    }));

    const orderNumber = `FYM-QT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const paymentReference = `PAY-${orderNumber}`;

    const { order, newQuote } = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          orderNumber,
          customerId: user.id,
          email: quote.inquiry.email,
          phone: quote.inquiry.phone || user.phone || '',
          customerName: quote.inquiry.name,
          status: OrderStatus.PENDING_PAYMENT,
          paymentStatus: PaymentStatus.PENDING,
          currency: quote.currency,
          subtotal: quote.subtotal,
          shippingTotal: quote.shippingTotal,
          grandTotal: quote.total,
          fulfillmentMethod: FulfillmentMethod.DELIVERY,
          customerNotes: `Converted from Quote #${quote.quoteNumber}`,
          items: {
            create: orderItemsData,
          },
        },
      });

      await tx.payment.create({
        data: {
          orderId: createdOrder.id,
          providerReference: paymentReference,
          status: PaymentStatus.PENDING,
          amount: quote.total,
          currency: quote.currency,
        },
      });

      const updatedQuote = await tx.quote.update({
        where: { id: quote.id },
        data: {
          status: QuoteStatus.ACCEPTED,
          acceptedAt: new Date(),
          orderId: createdOrder.id,
        },
      });

      await tx.inquiry.update({
        where: { id: quote.inquiryId },
        data: { status: 'ACCEPTED' },
      });

      return { order: createdOrder, newQuote: updatedQuote };
    });

    return NextResponse.json({
      message: 'Quote accepted and order created successfully',
      orderNumber: order.orderNumber,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Accept quote error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}