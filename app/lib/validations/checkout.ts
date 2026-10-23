import { FulfillmentMethod } from '@/app/generated/prisma/enums';
import { z } from 'zod';

export const checkoutInitializeSchema = z.object({
  email: z.string().email('Valid email is required').transform((val) => val.toLowerCase().trim()),
  phone: z.string().min(8, 'Phone number is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  fulfillmentMethod: z.nativeEnum(FulfillmentMethod).default(FulfillmentMethod.DELIVERY),
  shippingAddressId: z.string().optional().nullable(),
  shippingAddressSnapshot: z.object({
    recipientName: z.string(),
    phone: z.string(),
    line1: z.string(),
    line2: z.string().optional().nullable(),
    city: z.string(),
    state: z.string(),
    country: z.string().default('NG'),
    postalCode: z.string().optional().nullable(),
  }).optional().nullable(),
  customerNotes: z.string().optional().nullable(),
});

export type CheckoutInitializeInput = z.infer<typeof checkoutInitializeSchema>;