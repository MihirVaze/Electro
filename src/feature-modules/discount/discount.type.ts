import z from 'zod';

export const ZDiscount = z.object({
  id: z.string().trim().uuid().optional(),
  type: z.enum(['increment', 'decrement', 'none']),
  value: z.number(),
  isDeleted: z.boolean().default(false),
  deletedBy: z.string().trim().uuid().optional(),
  restoredBy: z.string().trim().uuid().optional(),
  createdBy: z.string().trim().uuid().optional(),
  updatedBy: z.string().trim().uuid().optional(),
  deletedAt: z.date().optional(),
  restoredAt: z.date().optional(),
});

export type Discount = z.infer<typeof ZDiscount>;
