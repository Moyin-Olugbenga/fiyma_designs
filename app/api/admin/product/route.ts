import { NextResponse } from 'next/server';
import { requireRole } from '../../services/auth/guards';
import { adminProductCreateSchema } from '@/app/lib/validations/catalog';
import { UserRole } from '@/app/generated/prisma/enums';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    // Enforce role authorization: STAFF, ADMIN, or SUPER_ADMIN required
    const adminUser = await requireRole([
      UserRole.STAFF,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ]);

    const body = await request.json();
    const result = adminProductCreateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check if slug or SKU already exists
    const existingSlug = await prisma.product.findUnique({
      where: { slug: data.slug },
    });
    if (existingSlug) {
      return NextResponse.json(
        { error: 'A product with this slug already exists.' },
        { status: 409 }
      );
    }

    if (data.sku) {
      const existingSku = await prisma.product.findUnique({
        where: { sku: data.sku },
      });
      if (existingSku) {
        return NextResponse.json(
          { error: 'A product with this SKU already exists.' },
          { status: 409 }
        );
      }
    }

    // Create product with nested variants, media, customization options, and collection links
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        sku: data.sku,
        description: data.description,
        shortDescription: data.shortDescription,
        type: data.type,
        status: data.status,
        basePrice: data.basePrice ?? null,
        currency: data.currency,
        priceOnRequest: data.priceOnRequest,
        fabric: data.fabric,
        careInstructions: data.careInstructions,
        leadTimeDays: data.leadTimeDays,
        featured: data.featured,
        publishedById: adminUser.id,
        collections: {
          create: data.collectionIds.map((collectionId, index) => ({
            collectionId,
            sortOrder: index,
          })),
        },
        variants: {
          create: data.variants.map((v) => ({
            name: v.name,
            sku: v.sku,
            attributes: v.attributes,
            priceAdjustment: v.priceAdjustment,
            stockQuantity: v.stockQuantity,
            isAvailable: v.isAvailable,
          })),
        },
        customizationOptions: {
          create: data.customizationOptions.map((opt) => ({
            name: opt.name,
            key: opt.key,
            type: opt.type,
            required: opt.required,
            choices: opt.choices,
            priceAdjustment: opt.priceAdjustment,
            sortOrder: opt.sortOrder,
          })),
        },
        media: {
          create: data.media.map((m) => ({
            url: m.url,
            alt: m.alt,
            type: m.type,
            sortOrder: m.sortOrder,
            isPrimary: m.isPrimary,
          })),
        },
      },
      include: {
        media: true,
        variants: true,
        customizationOptions: true,
        collections: {
          include: { collection: true },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Product created successfully',
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    console.error('Admin create product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}