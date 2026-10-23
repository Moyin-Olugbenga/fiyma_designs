import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '../services/auth/guards';
import { prisma } from '@/app/lib/prisma';

const wishlistAddSchema = z.object({
  productId: z.string().min(1),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            media: { where: { isPrimary: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ wishlistItems });
  } catch (error) {
    console.error('Fetch wishlist error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const result = wishlistAddSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const { productId } = result.data;

    // Verify product exists and is active
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    const wishlistItem = await prisma.wishlistItem.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
      update: {},
      create: {
        userId: user.id,
        productId,
      },
    });

    return NextResponse.json({ message: 'Added to wishlist', wishlistItem }, { status: 201 });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}