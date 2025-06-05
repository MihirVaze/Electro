import z from 'zod';
import { ZBaseSchema } from '../../../utility/base-schema';
import { ZClient } from '../../client/client.type';
import { ZUser } from '../../user/user.types';

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
    Client: ZClient.partial().optional(),
    User: ZUser.partial().optional(),
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
    Client: true,
    User: true,
}).merge(ZBaseSchema.partial());

export const ZUpdateClientBill = ZCreateClientBill.pick({
    basePrice: true,
    discountValue: true,
    total: true,
    billingDate: true,
    dueDate: true,
    status: true,
}).partial();

export const ZFindClientBill = ZClientBill.pick({
    status: true,
})
    .partial()
    .extend({
        limit: z.coerce.number().min(1),
        page: z.coerce.number().min(1),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        minTotal: z.coerce.number().optional(),
        maxTotal: z.coerce.number().optional(),
    });

export const ZValidateFindClientBill = z.object({
    query: ZFindClientBill,
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
export type FindClientBill = z.infer<typeof ZFindClientBill>;
