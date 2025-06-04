import { z } from 'zod';
import { ZCustomerMeter } from '../customer/customer.type';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZConsumption = ZBaseSchema.partial().extend({
    customerMeterId: z.string().trim().uuid(),
    workerId: z.string().trim().uuid(),
    unitsUsed: z.number().positive(),
    description: z.string().trim().optional(),
    customerMeter: ZCustomerMeter.optional(),
});

export type Consumption = z.infer<typeof ZConsumption>;

export const Zcreate = z.object({
    body: ZConsumption.pick({
        customerMeterId: true,
        unitsUsed: true,
        description: true,
    }),
});
export type Create = z.infer<typeof Zcreate>;

export const Zupdate = z.object({
    params: ZBaseSchema.pick({ id: true }),
    body: ZConsumption.partial(),
});

export type Update = z.infer<typeof Zupdate>;

export const Zfilter = z.object({
    query: ZConsumption.partial().pick({
        workerId: true,
        unitsUsed: true,
    }),
});

export type Filter = z.infer<typeof Zfilter>;

export const ZIdParams = z.object({
    params: ZBaseSchema.pick({ id: true }),
});
