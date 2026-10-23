import { ContentStatus } from '@/app/generated/prisma/enums';
import { z } from 'zod';

export const newsletterSubscribeSchema = z.object({
  email: z.string().email('Valid email is required').transform((val) => val.toLowerCase().trim()),
  source: z.string().optional().nullable(),
});

export const faqUpsertSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  category: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(false),
});

export const contentPageUpsertSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  content: z.record(z.string(), z.any()), // Structured rich content JSON
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
});

export const reviewCreateSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().optional().nullable(),
  body: z.string().min(5, 'Review body must be at least 5 characters'),
});