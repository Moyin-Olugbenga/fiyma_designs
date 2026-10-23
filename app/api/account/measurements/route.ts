import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../services/auth/guards';
import { prisma } from '@/app/lib/prisma';
import { measurementProfileSchema } from '@/app/lib/validations/account';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const profiles = await prisma.measurementProfile.findMany({
      where: { userId: user.id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ measurementProfiles: profiles });
  } catch (error) {
    console.error('List measurement profiles error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const result = measurementProfileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const data = result.data;

    const profile = await prisma.$transaction(async (tx) => {
      if (data.isDefault) {
        await tx.measurementProfile.updateMany({
          where: { userId: user.id, isDefault: true },
          data: { isDefault: false },
        });
      }

      return await tx.measurementProfile.create({
        data: {
          userId: user.id,
          label: data.label,
          unit: data.unit,
          measurements: data.measurements as any,
          notes: data.notes,
          isDefault: data.isDefault,
        },
      });
    });

    return NextResponse.json({ message: 'Measurement profile saved', measurementProfile: profile }, { status: 201 });
  } catch (error) {
    console.error('Create measurement profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}