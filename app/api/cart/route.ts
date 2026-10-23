import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { prisma } from '@/app/lib/prisma';
import { getCurrentUser } from '../services/auth/guards';

const GUEST_CART_COOKIE = 'fiymah_guest_cart';

const addToCartSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional().nullable(),
  measurementProfileId: z.string().optional().nullable(),
  quantity: z.number().int().positive().default(1),
  selectedOptions: z.record(z.string(), z.any()).optional().nullable(),
  customMeasurements: z.record(z.string(), z.any()).optional().nullable(),
  notes: z.string().optional().nullable(),
});

async function getOrCreateCart(user: { id: string } | null, cookieStore: any) {
  if (user) {
    let cart = await prisma.cart.findFirst({
      where: { userId: user.id, status: 'ACTIVE' },
      include: { items: { include: { product: true, variant: true } } },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id, status: 'ACTIVE' },
        include: { items: { include: { product: true, variant: true } } },
      });
    }
    return cart;
  } else {
    let guestToken = cookieStore.get(GUEST_CART_COOKIE)?.value;
    let guestTokenHash = guestToken ? crypto.createHash('sha256').update(guestToken).digest('hex') : null;

    let cart = guestTokenHash
      ? await prisma.cart.findUnique({
          where: { guestTokenHash },
          include: { items: { include: { product: true, variant: true } } },
        })
      : null;

    if (!cart) {
      const newToken = crypto.randomBytes(32).toString('hex');
      guestTokenHash = crypto.createHash('sha256').update(newToken).digest('hex');
      
      cart = await prisma.cart.create({
        data: { guestTokenHash, status: 'ACTIVE' },
        include: { items: { include: { product: true, variant: true } } },
      });

      cookieStore.set({
        name: GUEST_CART_COOKIE,
        value: newToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
    }
    return cart;
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    const cookieStore = await cookies();
    const cart = await getOrCreateCart(user, cookieStore);

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Fetch cart error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const cookieStore = await cookies();
    const body = await request.json();

    const result = addToCartSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid cart item parameters', details: result.error.format() }, { status: 400 });
    }

    const { productId, variantId, measurementProfileId, quantity, selectedOptions, customMeasurements, notes } = result.data;

    // Verify product availability and existence
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Product is unavailable' }, { status: 400 });
    }

    if (variantId) {
      const variant = await prisma.productVariant.findUnique({ where: { id: variantId } });
      if (!variant || !variant.isAvailable || variant.productId !== productId) {
        return NextResponse.json({ error: 'Selected variant is invalid or unavailable' }, { status: 400 });
      }
    }

    const cart = await getOrCreateCart(user, cookieStore);

    // Add item to cart
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        variantId: variantId ?? null,
        measurementProfileId: measurementProfileId ?? null,
        quantity,
        selectedOptions: selectedOptions ?? undefined,
        customMeasurements: customMeasurements ?? undefined,
        notes: notes ?? null,
      },
      include: { product: true, variant: true },
    });

    return NextResponse.json({ message: 'Item added to bag', cartItem }, { status: 201 });
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}