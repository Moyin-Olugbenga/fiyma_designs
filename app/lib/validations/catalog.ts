import { ProductType, ProductStatus, ContentStatus, MediaType, CustomizationType } from '@/app/generated/prisma/enums';
import { z } from 'zod';

export const productQuerySchema = z.object({
  collection: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(['newest', 'price-asc', 'price-desc', 'popular']).default('newest'),
  page: z.string().default('1').transform((val) => Math.max(1, parseInt(val, 10) || 1)),
  limit: z.string().default('12').transform((val) => Math.min(50, Math.max(1, parseInt(val, 10) || 12))),
});

export const adminProductCreateSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(150),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
  sku: z.string().optional().nullable(),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().optional().nullable(),
  type: z.nativeEnum(ProductType).default(ProductType.MADE_TO_ORDER),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.DRAFT),
  basePrice: z.number().positive('Base price must be positive').optional().nullable(),
  currency: z.string().default('NGN'),
  priceOnRequest: z.boolean().default(false),
  fabric: z.string().optional().nullable(),
  careInstructions: z.string().optional().nullable(),
  leadTimeDays: z.number().int().positive().optional().nullable(),
  featured: z.boolean().default(false),
  collectionIds: z.array(z.string()).default([]),
  variants: z.array(
    z.object({
      name: z.string().min(1),
      sku: z.string().optional().nullable(),
      attributes: z.record(z.string(), z.any()),
      priceAdjustment: z.number().default(0),
      stockQuantity: z.number().int().optional().nullable(),
      isAvailable: z.boolean().default(true),
    })
  ).default([]),
  customizationOptions: z.array(
    z.object({
      name: z.string().min(1),
      key: z.string().min(1),
      type: z.nativeEnum(CustomizationType),
      required: z.boolean().default(false),
      choices: z.any().optional(),
      priceAdjustment: z.number().default(0),
      sortOrder: z.number().int().default(0),
    })
  ).default([]),
  media: z.array(
    z.object({
      url: z.string().url(),
      alt: z.string().optional().nullable(),
      type: z.nativeEnum(MediaType).default(MediaType.IMAGE),
      sortOrder: z.number().int().default(0),
      isPrimary: z.boolean().default(false),
    })
  ).default([]),
});

export const adminCollectionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  description: z.string().optional().nullable(),
  heroImageUrl: z.string().url().optional().nullable(),
  mobileHeroImageUrl: z.string().url().optional().nullable(),
  headline: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
  isFeatured: z.boolean().default(false),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
});