import z from 'zod';

export const ZElectroRoleEnum = z.enum([
    'superadmin',
    'client_manager',
    'state_manager',
    'district_manager',
    'city_manager',
    'worker',
    'client_admin',
]);

export type ElectroRoleEnum = z.infer<typeof ZElectroRoleEnum>;

export const ZElectroRole = z.object({
    id: z.string().uuid().optional(),
    role: ZElectroRoleEnum,
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});
export type ElectroRole = z.infer<typeof ZElectroRole>;

export const ZClientRoleEnum = z.enum([
    'admin',
    'state_head',
    'district_head',
    'district_head',
    'city_head',
    'service_worker',
]);

export type ClientRoleEnum = z.infer<typeof ZElectroRoleEnum>;

export const ZClientRole = z.object({
    id: z.string().uuid().optional(),
    role: ZClientRoleEnum,
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});
export type ClientRole = z.infer<typeof ZElectroRole>;
