import z from 'zod';

export const ZDiscount = z.object({
    id: z.string().trim().uuid().optional(),

    clientId: z.string().trim().uuid(),
    type: z.enum(['increment', 'decrement', 'none']),
    value: z.number().positive(),

    minValue: z.number().positive().optional(),
    maxValue: z.number().positive().optional(),

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type Discount = z.infer<typeof ZDiscount>;

export const ZFindDiscounts = z.object({
    query: z.object({
        minValue: z.number().positive().optional(),
        maxValue: z.number().positive().optional(),
        value: z.number().positive().optional(),
    }),
});

export type FindDiscounts = z.infer<typeof ZFindDiscounts>;

export const ZFindDiscount = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
});

export type FindDiscount = z.infer<typeof ZFindDiscount>;

export const ZCreateDiscount = z.object({
    body: ZDiscount.pick({
        minValue: true,
        maxValue: true,
        value: true,
    }),
});

export type CreateDiscount = z.infer<typeof ZCreateDiscount>;

export const ZUpdateDiscount = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
    body: z.object({
        minValue: z.number().positive().optional(),
        maxValue: z.number().positive().optional(),
        value: z.number().positive().optional(),
    }),
});

export type UpdateDiscount = z.infer<typeof ZUpdateDiscount>;

export const ZDeleteDiscount = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
});

export type DeletePlan = z.infer<typeof ZDeleteDiscount>;
