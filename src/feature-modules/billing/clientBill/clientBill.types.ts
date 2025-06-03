import z from 'zod';
import { ZBaseSchema } from '../../../utility/base-schema';

export const ZClientBill = z.object({
    clientId: z.string().trim().uuid(),
    planId: z.string().trim().uuid(),
    basePrice: z.number(),
    discountId: z.string().trim().uuid(),
    discountType: z.enum(['increment', 'decrement', 'none']),
    discountValue: z.number(),
    total: z.number(),
    billingDate: z.date(),
    dueDate: z.date(),
    status: z.enum(['paid', 'unpaid']),
});

export const ZCreateClientBill = ZClientBill.pick({
    clientId: true,
    planId: true,
    basePrice: true,
    discountId: true,
    discountType: true,
    discountValue: true,
    total: true,
    billingDate: true,
    dueDate: true,
    status: true,
}).merge(ZBaseSchema.partial());

export const ZUpdateClientBill = ZCreateClientBill.pick({
    basePrice: true,
    discountValue: true,
    total: true,
    billingDate: true,
    dueDate: true,
    status: true,
}).partial();

export const ZFindClientBill = z.object({
    query: ZClientBill.pick({
        status: true,
    })
        .partial()
        .extend({
            limit: z.coerce.number().min(1),
            page: z.coerce.number().min(1),
        }),
});

export const ZValidateUpdateClientBill = z.object({
    params: z.object({
        id: z.string().trim().uuid(),
    }),
    body: ZUpdateClientBill,
});

export type ClientBill = z.infer<typeof ZClientBill>;
export type CreateClientBill = z.infer<typeof ZCreateClientBill>;
export type UpdateClientBill = z.infer<typeof ZUpdateClientBill>;
export type FindClientBill = z.infer<typeof ZClientBill>;
