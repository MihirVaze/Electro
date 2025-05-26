import z from 'zod';

export const ZStateUser = z.object({
    id: z.string().trim().uuid().optional(),
    userId: z.string().trim().uuid(),
    stateId: z.string().trim().uuid(),
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type StateUser = z.infer<typeof ZStateUser>;

export const ZDistrictUser = z.object({
    id: z.string().trim().uuid().optional(),
    userId: z.string().trim().uuid(),
    districtId: z.string().trim().uuid(),
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type DistrictUser = z.infer<typeof ZDistrictUser>;

export const ZCityUser = z.object({
    id: z.string().trim().uuid().optional(),
    userId: z.string().trim().uuid(),
    cityId: z.string().trim().uuid(),
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type CityUser = z.infer<typeof ZCityUser>;

export type LocationType = 'city' | 'state' | 'district';
