import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import { ProductStatus, ContentStatus } from '@/app/generated/prisma/enums';
import { prisma } from '@/app/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        status: ProductStatus.ACTIVE,
      },
      include: {
        media: {
          orderBy: { sortOrder: 'asc' },
        },
        variants: {
          where: { isAvailable: true },
        },
        customizationOptions: {
          orderBy: { sortOrder: 'asc' },
        },
        collections: {
          include: {
            collection: {
              select: {
                id: true,
                name: true,
                slug: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Filter out collections that might not be published
    const publishedCollections = product.collections.filter(
      (pc) => pc.collection.status === ContentStatus.PUBLISHED
    );

    return NextResponse.json({
      product: {
        ...product,
        collections: publishedCollections,
      },
    });
  } catch (error) {
    console.error('Fetch single product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}