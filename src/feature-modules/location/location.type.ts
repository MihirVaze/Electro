import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZState = ZBaseSchema.partial().extend({
    name: z.string().trim(),
});

export type State = z.infer<typeof ZState>;

export const ZDistrict = ZBaseSchema.partial().extend({
    stateId: z.string().trim().uuid(),
    name: z.string().trim(),
});

export type District = z.infer<typeof ZDistrict>;

export const ZCity = ZBaseSchema.partial().extend({
    districtId: z.string().trim().uuid(),
    name: z.string().trim(),
});

export type City = z.infer<typeof ZCity>;
