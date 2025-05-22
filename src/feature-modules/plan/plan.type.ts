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

export const ZFindPlan = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty()
    })
});

export type FindPlan = z.infer<typeof ZDeletePlan>

export const ZCreatePlan = z.object({
    body: ZPlan.pick({
        minCustomers: true,
        maxCustomers: true,
        basePrice: true
    })
});

export type CreatePlan = z.infer<typeof ZCreatePlan>

export const ZUpdatePlan = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty()
    }),
    body: z.object({
        minCustomers: z.number().positive().optional(),
        maxCustomers: z.number().positive().optional(),
        basePrice: z.number().positive().optional()
    })
});

export type UpdatePlan = z.infer<typeof ZUpdatePlan>

export const ZDeletePlan = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty()
    })
});

export type DeletePlan = z.infer<typeof ZDeletePlan>