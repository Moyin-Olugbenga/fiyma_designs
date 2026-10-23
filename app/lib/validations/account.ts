import { AddressType } from '@/app/generated/prisma/enums';
import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  phone: z.string().min(8).max(20).optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

export const addressSchema = z.object({
  label: z.string().max(50).optional().nullable(),
  type: z.nativeEnum(AddressType).default(AddressType.HOME),
  recipientName: z.string().min(1, 'Recipient name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional().nullable(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().default('NG'),
  postalCode: z.string().optional().nullable(),
  isDefault: z.boolean().default(false),
});

export const measurementProfileSchema = z.object({
  label: z.string().min(1, 'Profile label is required').max(50),
  unit: z.enum(['cm', 'inches']).default('cm'),
  measurements: z.record(z.string(), z.union([z.number(), z.string()])), // e.g. { chest: 40, sleeve: 32 }
  notes: z.string().optional().nullable(),
  isDefault: z.boolean().default(false),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type MeasurementProfileInput = z.infer<typeof measurementProfileSchema>;