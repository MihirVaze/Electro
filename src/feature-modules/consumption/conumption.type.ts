import { z } from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const Zconsumption = ZBaseSchema.partial().extend({
    customerMeterId: z.string().trim().uuid(),
    workerId: z.string().trim().uuid(),
    unitsUsed: z.number().positive(),
    description: z.string().trim(),
});

export type Consumption = z.infer<typeof Zconsumption>;

export const Zcreate = Zconsumption.pick({
    unitsUsed: true,
    description: true,
});
export type Create = z.infer<typeof Zcreate>;

export const Zupdate = Zconsumption.pick({
    unitsUsed: true,
    description: true,
});

export type Update = z.infer<typeof Zupdate>;

export const Zfilter = z.object({
    customerId: z.string().trim().uuid().optional(),
    workerId: z.string().trim().uuid().optional(),
    unitsUsed: z.number().positive().optional(),
});

export type Filter = z.infer<typeof Zfilter>;
