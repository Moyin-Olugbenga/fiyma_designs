import { InquiryType, QuoteStatus } from '@/app/generated/prisma/enums';
import { z } from 'zod';

export const inquirySubmitSchema = z.object({
  type: z.nativeEnum(InquiryType),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email is required').transform((val) => val.toLowerCase().trim()),
  phone: z.string().min(8, 'Phone number is required'),
  occasion: z.string().optional().nullable(),
  garmentCount: z.number().int().positive().optional().nullable(),
  requestedDate: z.string().transform((val) => (val ? new Date(val) : undefined)).optional().nullable(),
  budgetMin: z.number().positive().optional().nullable(),
  budgetMax: z.number().positive().optional().nullable(),
  message: z.string().min(10, 'Please provide more details about your inquiry'),
  inspirationUrls: z.array(z.string().url()).optional().default([]),
});

export const adminCreateQuoteSchema = z.object({
  inquiryId: z.string().min(1),
  currency: z.string().default('NGN'),
  items: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.number().int().positive(),
      unitPrice: z.number().positive(),
    })
  ).min(1, 'At least one quote item is required'),
  shippingTotal: z.number().min(0).default(0),
  notes: z.string().optional().nullable(),
  expiresAt: z.string().transform((val) => new Date(val)),
});

export type InquirySubmitInput = z.infer<typeof inquirySubmitSchema>;
export type AdminCreateQuoteInput = z.infer<typeof adminCreateQuoteSchema>;