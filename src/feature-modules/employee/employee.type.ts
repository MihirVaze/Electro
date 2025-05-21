import z from 'zod';

export const ZEmployeeRole = z.object({
    id: z.string().trim().uuid().optional(),
    userId: z.string().trim().uuid(),
    roleId: z.string().trim().uuid(),
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type EmployeeRole = z.infer<typeof ZEmployeeRole>;

export const ZStateEmployee = z.object({
    id: z.string().trim().uuid().optional(),
    employeeRoleId: z.string().trim().uuid(),
    stateId: z.string().trim().uuid(),
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type StateEmployee = z.infer<typeof ZStateEmployee>;

export const ZDistrictEmployee = z.object({
    id: z.string().trim().uuid().optional(),
    employeeRoleId: z.string().trim().uuid(),
    districtId: z.string().trim().uuid(),
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type DistrictEmployee = z.infer<typeof ZDistrictEmployee>;

export const ZCityEmployee = z.object({
    id: z.string().trim().uuid().optional(),
    employeeRoleId: z.string().trim().uuid(),
    cityId: z.string().trim().uuid(),
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type CityEmployee = z.infer<typeof ZCityEmployee>;