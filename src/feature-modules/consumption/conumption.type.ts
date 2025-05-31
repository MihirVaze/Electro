import { z } from 'zod';

export const Zconsumption = z.object({
    id: z.string().uuid().optional(),
    customerMeterId: z.string().trim().uuid(),
    workerId: z.string().trim().uuid(),
    unitsUsed: z.number().positive(),
    description: z.string().trim(),
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
    updatedAt: z.date().optional(),
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
