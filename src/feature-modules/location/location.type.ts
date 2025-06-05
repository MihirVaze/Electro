import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZCity = ZBaseSchema.partial().extend({
    districtId: z.string().trim().uuid(),
    name: z.string().trim(),
});

export type City = z.infer<typeof ZCity>;

export const ZDistrict = ZBaseSchema.partial().extend({
    stateId: z.string().trim().uuid(),
    name: z.string().trim(),
    city: ZCity.partial().optional(),
});

export type District = z.infer<typeof ZDistrict>;

export const ZState = ZBaseSchema.partial().extend({
    name: z.string().trim(),
    district: ZDistrict.partial().optional(),
});

export type State = z.infer<typeof ZState>;
