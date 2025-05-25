import z from 'zod';

export const ZBilling = z.object({
  id: z.string().trim().uuid().optional(),
  planId: z.string().trim().uuid(),
  basePrice: z.number(),
  discountId: z.string().trim().uuid(),
  discountType: z.enum(['increment', 'decrement', 'none']),
  discountValue: z.number(),
  clientId: z.string().trim().uuid(),
  total: z.number(),
  isDeleted: z.boolean().default(false),
  deletedBy: z.string().trim().uuid().optional(),
  restoredBy: z.string().trim().uuid().optional(),
  createdBy: z.string().trim().uuid().optional(),
  updatedBy: z.string().trim().uuid().optional(),
  deletedAt: z.date().optional(),
  restoredAt: z.date().optional(),
});

export type Billing = z.infer<typeof ZBilling>;
