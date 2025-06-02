import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

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

export const ZRole = ZBaseSchema.partial().extend({
    role: ZRoleEnum,
});
export type Role = z.infer<typeof ZRole>;
