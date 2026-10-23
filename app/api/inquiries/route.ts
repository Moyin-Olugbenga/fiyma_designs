import { NextResponse } from 'next/server';
import { getCurrentUser } from '../services/auth/guards';
import { inquirySubmitSchema } from '@/app/lib/validations/inquiry';
import { prisma } from '@/app/lib/prisma';
import { InquiryStatus } from '@/app/generated/prisma/enums';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser(); // Optional: can be submitted by guest or logged-in user
    const body = await request.json();

    const result = inquirySubmitSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const data = result.data;
    const reference = `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const inquiry = await prisma.inquiry.create({
      data: {
        reference,
        customerId: user ? user.id : null,
        type: data.type,
        status: InquiryStatus.NEW,
        name: data.name,
        email: data.email,
        phone: data.phone,
        occasion: data.occasion,
        garmentCount: data.garmentCount,
        requestedDate: data.requestedDate,
        budgetMin: data.budgetMin ?? null,
        budgetMax: data.budgetMax ?? null,
        message: data.message,
        inspirationUrls: data.inspirationUrls,
      },
    });

    return NextResponse.json(
      {
        message: 'Inquiry submitted successfully. Our styling team will reach out within 24-48 hours.',
        reference: inquiry.reference,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submit inquiry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}