import z from 'zod';

export const ZRole = z.object({
    id: z.string().uuid().optional(),
    role: z.enum(['superadmin', 'client_manager', 'state_manager'
        , 'district_manager', 'city_manager', 'worker']),
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});
export type Role = z.infer<typeof ZRole>;

export type RoleEnum = 'superadmin' | 'client_manager' | 'state_manager'
    | 'district_manager' | 'city_manager' | 'worker';