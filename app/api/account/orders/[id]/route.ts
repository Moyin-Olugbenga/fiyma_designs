import { getCurrentUser } from '@/app/api/services/auth/guards';
import { PaymentStatus } from '@/app/generated/prisma/enums';
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await context.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        payments: true,
      },
    });

    if (!order || order.customerId !== user.id) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.paymentStatus !== PaymentStatus.SUCCESS) {
      return NextResponse.json({ error: 'Receipt available only for successfully paid orders' }, { status: 400 });
    }

    // Return receipt payload snapshot
    return NextResponse.json({
      receipt: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        email: order.email,
        phone: order.phone,
        paidAt: order.paidAt,
        currency: order.currency,
        subtotal: order.subtotal,
        customizationTotal: order.customizationTotal,
        discountTotal: order.discountTotal,
        shippingTotal: order.shippingTotal,
        grandTotal: order.grandTotal,
        fulfillmentMethod: order.fulfillmentMethod,
        shippingAddress: order.shippingAddress,
        items: order.items,
        payments: order.payments,
      },
    });
  } catch (error) {
    console.error('Fetch order receipt error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}