import { NextResponse } from 'next/server';
import { ContentStatus, ProductStatus } from '@/app/generated/prisma/enums';
import { productQuerySchema } from '@/app/lib/validations/catalog';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const queryResult = productQuerySchema.safeParse(Object.fromEntries(url.searchParams));

    if (!queryResult.success) {
      return NextResponse.json({ error: 'Invalid query parameters', details: queryResult.error.format() }, { status: 400 });
    }

    const { collection, q, sort, page, limit } = queryResult.data;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: ProductStatus.ACTIVE,
    };

    if (collection) {
      where.collections = {
        some: {
          collection: {
            slug: collection,
            status: ContentStatus.PUBLISHED,
          },
        },
      };
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { fabric: { contains: q, mode: 'insensitive' } },
      ];
    }

    // Determine sorting
    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { basePrice: 'asc' };
    if (sort === 'price-desc') orderBy = { basePrice: 'desc' };
    if (sort === 'popular') orderBy = { featured: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          media: { orderBy: { sortOrder: 'asc' } },
          collections: { include: { collection: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('List products error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}