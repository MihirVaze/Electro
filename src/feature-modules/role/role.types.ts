import z from 'zod';

export const ZRole = z.object({
    id: z.string().uuid().optional(),
    role: z.enum(['superadmin', 'client_manager', 'state_manager'
        , 'district_manager', 'city_manager', 'worker'])
});
export type Role = z.infer<typeof ZRole>;

export type RoleEnum = 'superadmin' | 'client_manager' | 'state_manager'
    | 'district_manager' | 'city_manager' | 'worker';