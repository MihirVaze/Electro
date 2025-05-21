import z from 'zod';

export const ZPlan = z.object({
    id: z.string().trim().uuid().optional(),
    minCustomers: z.number(),
    maxCustomers: z.number(),
    basePrice: z.number(),
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type Plan = z.infer<typeof ZPlan>;