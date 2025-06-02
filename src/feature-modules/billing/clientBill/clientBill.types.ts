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

export const ZUpdateClientBill = ZClientBill.pick({
    basePrice: true,
    discountValue: true,
    total: true,
    billingDate: true,
    dueDate: true,
    status: true,
}).partial();

export type ClientBill = z.infer<typeof ZClientBill>;
export type CreateClientBill = z.infer<typeof ZCreateClientBill>;
export type UpdateClientBill = z.infer<typeof ZUpdateClientBill>;
