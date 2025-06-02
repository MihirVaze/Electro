import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZStateUser = ZBaseSchema.partial().extend({
    userId: z.string().trim().uuid(),
    stateId: z.string().trim().uuid(),
});

export type StateUser = z.infer<typeof ZStateUser>;

export const ZDistrictUser = ZBaseSchema.partial().extend({
    userId: z.string().trim().uuid(),
    districtId: z.string().trim().uuid(),
});

export type DistrictUser = z.infer<typeof ZDistrictUser>;

export const ZCityUser = ZBaseSchema.partial().extend({
    userId: z.string().trim().uuid(),
    cityId: z.string().trim().uuid(),
});

export type CityUser = z.infer<typeof ZCityUser>;

export type LocationType = 'city' | 'state' | 'district';
