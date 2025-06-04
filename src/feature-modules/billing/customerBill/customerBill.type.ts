import z from 'zod';
import { ZBaseSchema } from '../../../utility/base-schema';
import { ZCustomer, ZCustomerMeter } from '../../customer/customer.type';

export const ZCustomerBill = ZBaseSchema.partial().extend({
    customerMeterId: z.string().trim().uuid(),
    basePrice: z.number().positive().optional(),
    perUnitCost: z.number().positive().optional(),
    consumptionId: z.string().trim().uuid().optional(),
    total: z.number().positive().optional(),
    billingDate: z.date().optional(),
    dueDate: z.date(),
    status: z.string().default('unpaid').optional(),

    limit: z.coerce.number().default(10).optional(),
    page: z.coerce.number().default(1).optional(),

    customer: ZCustomer.optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    minTotal: z.coerce.number().positive().optional(),
    maxTotal: z.coerce.number().positive().optional(),
});

export type CustomerBill = z.infer<typeof ZCustomerBill>;

export const ZFindBills = z.object({
    query: ZCustomerBill.pick({
        limit: true,
        page: true,
        status: true,
        startDate: true,
        endDate: true,
        minTotal: true,
        maxTotal: true,
    }).partial(),
});

export const ZUpdateBill = z.object({
    params: z.object({
        billId: z.string().trim().uuid(),
    }),
    body: ZCustomerBill.pick({
        status: true,
    }),
});

export const ZDeleteBill = z.object({
    params: ZCustomerBill.pick({
        id: true,
    }),
});

export const ZBillData = z.object({
    email: z.string(),
    customerMeter: ZCustomerMeter,
    unitsUsed: z.coerce.number().positive(),
    meter: z.string(),
    total: z.coerce.number(),
    billingDate: z.date(),
    dueDate: z.date(),
});

export type BillData = z.infer<typeof ZBillData>;
