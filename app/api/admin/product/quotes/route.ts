import { NextResponse } from 'next/server';
import { UserRole, InquiryStatus, QuoteStatus } from '@/app/generated/prisma/enums';
import { requireRole } from '@/app/api/services/auth/guards';
import { adminCreateQuoteSchema } from '@/app/lib/validations/inquiry';
import { prisma } from '@/app/lib/prisma';
// import { UserRole } from '../../../../app/generated/prisma';

export async function POST(request: Request) {
  try {
    const adminUser = await requireRole([
      UserRole.STAFF,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ]);

    const body = await request.json();
    const result = adminCreateQuoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const data = result.data;

    // Verify inquiry exists
    const inquiry = await prisma.inquiry.findUnique({ where: { id: data.inquiryId } });
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    // Calculate subtotal and total server-side
    let subtotal = 0;
    const computedItems = data.items.map((item) => {
      const lineTotal = item.quantity * item.unitPrice;
      subtotal += lineTotal;
      return {
        ...item,
        lineTotal,
      };
    });

    const total = subtotal + data.shippingTotal;
    const quoteNumber = `QT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const quote = await prisma.$transaction(async (tx) => {
      const newQuote = await tx.quote.create({
        data: {
          quoteNumber,
          inquiryId: data.inquiryId,
          createdById: adminUser.id,
          status: QuoteStatus.SENT,
          currency: data.currency,
          items: computedItems,
          subtotal,
          shippingTotal: data.shippingTotal,
          total,
          notes: data.notes,
          expiresAt: data.expiresAt,
          sentAt: new Date(),
        },
      });

      // Update inquiry status to QUOTED
      await tx.inquiry.update({
        where: { id: data.inquiryId },
        data: { status: InquiryStatus.QUOTED },
      });

      return newQuote;
    });

    return NextResponse.json(
      {
        message: 'Quote created and sent successfully',
        quote,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    console.error('Admin create quote error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}