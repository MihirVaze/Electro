import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZPlan = ZBaseSchema.partial().extend({
    minCustomers: z.number().positive(),
    maxCustomers: z.number().positive(),
    basePrice: z.number().positive(),

    minPrice: z.number().positive().optional(),
    maxPrice: z.number().positive().optional(),
});

export type Plan = z.infer<typeof ZPlan>;

export const ZFindPlans = z.object({
    query: z.object({
        minCustomers: z.number().positive().optional(),
        maxCustomers: z.number().positive().optional(),
        minPrice: z.number().positive().optional(),
        maxPrice: z.number().positive().optional(),
        basePrice: z.number().positive().optional(),
    }),
});

export type FindPlans = z.infer<typeof ZFindPlans>;

export const ZFindPlan = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
});

export type FindPlan = z.infer<typeof ZDeletePlan>;

export const ZCreatePlan = z.object({
    body: ZPlan.pick({
        minCustomers: true,
        maxCustomers: true,
        basePrice: true,
    }),
});

export type CreatePlan = z.infer<typeof ZCreatePlan>;

export const ZUpdatePlan = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
    body: z.object({
        minCustomers: z.number().positive().optional(),
        maxCustomers: z.number().positive().optional(),
        basePrice: z.number().positive().optional(),
    }),
});

export type UpdatePlan = z.infer<typeof ZUpdatePlan>;

export const ZDeletePlan = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
});

export type DeletePlan = z.infer<typeof ZDeletePlan>;
