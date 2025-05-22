import z from 'zod';

export const ZPlan = z.object({
    id: z.string().trim().uuid().optional(),
    minCustomers: z.number().positive(),
    maxCustomers: z.number().positive(),
    minPrice: z.number().positive().optional(),
    maxPrice: z.number().positive().optional(),
    basePrice: z.number().positive(),
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type Plan = z.infer<typeof ZPlan>;