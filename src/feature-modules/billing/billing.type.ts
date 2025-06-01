import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZBilling = ZBaseSchema.partial().extend({
    planId: z.string().trim().uuid(),
    basePrice: z.number(),
    discountId: z.string().trim().uuid(),
    discountType: z.enum(['increment', 'decrement', 'none']),
    discountValue: z.number(),
    clientId: z.string().trim().uuid(),
    total: z.number(),
});

export type Billing = z.infer<typeof ZBilling>;
