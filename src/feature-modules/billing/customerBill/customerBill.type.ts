import z from 'zod';
import { ZBaseSchema } from '../../../utility/base-schema';

export const ZCustomerBill = ZBaseSchema.partial().extend({
    customerMeterId: z.string().trim().uuid(),
    basePrice: z.number().positive().optional(),
    perUnitCost: z.number().positive().optional(),
    consumptionId: z.string().trim().uuid().optional(),
    total: z.number().positive().optional(),
    billingDate: z.date().optional(),
    dueDate: z.date(),
    status: z.enum(['paid', 'unpaid']).default('unpaid').optional(),

    limit: z.coerce.number().default(10).optional(),
    page: z.coerce.number().default(1).optional(),
});

export type CustomerBill = z.infer<typeof ZCustomerBill>;

export const ZFindBills = z.object({
    query: ZCustomerBill.pick({
        limit: true,
        page: true,
    }),
});

export const ZUpdateBill = z.object({
    body: ZCustomerBill.pick({
        status: true,
    }),
});
