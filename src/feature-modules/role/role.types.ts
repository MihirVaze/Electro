import z from 'zod';

export const ZRoleEnum = z.enum([
    'superadmin',
    'client_manager',
    'state_manager',
    'district_manager',
    'city_manager',
    'worker',
    'client_admin', // India Head For the Client
    'service_worker',
    'customer',
]);
export type RoleEnum = z.infer<typeof ZRoleEnum>;

export const ZRole = z.object({
    id: z.string().uuid().optional(),
    role: ZRoleEnum,
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});
export type Role = z.infer<typeof ZRole>;
