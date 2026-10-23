import { prisma } from '@/app/lib/prisma';
import { newsletterSubscribeSchema } from '@/app/lib/validations/operations';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = newsletterSubscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const { email, source } = result.data;

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { unsubscribedAt: null }, // Re-subscribe if previously unsubscribed
      create: { email, source },
    });

    return NextResponse.json({ message: 'Successfully subscribed to Fiyma updates', subscriber }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}