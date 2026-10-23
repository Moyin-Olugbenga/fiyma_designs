import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../services/auth/guards';
import { prisma } from '@/app/lib/prisma';
import { addressSchema } from '@/app/lib/validations/account';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const addresses = await prisma.address.findMany({
      where: { userId: user.id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error('List addresses error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const result = addressSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const data = result.data;

    // Use transaction to ensure only one address is marked as default if requested
    const address = await prisma.$transaction(async (tx) => {
      if (data.isDefault) {
        await tx.address.updateMany({
          where: { userId: user.id, isDefault: true },
          data: { isDefault: false },
        });
      }

      return await tx.address.create({
        data: {
          userId: user.id,
          ...data,
        },
      });
    });

    return NextResponse.json({ message: 'Address created successfully', address }, { status: 201 });
  } catch (error) {
    console.error('Create address error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}