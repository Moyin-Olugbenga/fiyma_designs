import { ContentStatus } from '@/app/generated/prisma/enums';
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({ collections });
  } catch (error) {
    console.error('List collections error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}