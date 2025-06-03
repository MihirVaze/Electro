import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';
import { ZRole } from '../role/role.types';

export const ZUser = ZBaseSchema.partial().extend({
    name: z.string().trim().nonempty(),
    phoneNo: z
        .string()
        .trim()
        .nonempty()
        .length(10, 'Enter a valid phone number'),
    email: z.string().trim().email({ message: 'Enter a valid e-mail' }),
    password: z
        .string()
        .trim()
        .min(5, { message: 'password must be 5 chars long' }),
});

export type User = z.infer<typeof ZUser>;

const ZUserRole = ZBaseSchema.partial().extend({
    userId: z.string().trim().uuid(),
    roleId: z.string().trim().uuid(),
    Role: ZRole.partial().optional(),
});

export type UserRole = z.infer<typeof ZUserRole>;

const ZUserRoleLocation = ZBaseSchema.partial().extend({
    roleId: z.string().trim().uuid(),
    locationIds: z.array(z.string()).optional(),
});

export type UserRoleLocation = z.infer<typeof ZUserRoleLocation>;

export const ZregisterUser = z.object({
    body: z.object({
        user: ZUser.pick({
            name: true,
            phoneNo: true,
            email: true,
        }),
        roles: z.array(
            ZUserRoleLocation.pick({
                roleId: true,
                locationIds: true,
            }),
        ),
    }),
});

export type registerUser = z.infer<typeof ZregisterUser>;

export const ZEditUser = z.object({
    body: z.object({
        user: z.object({
            id: z.string().trim().uuid().optional(),
            name: z.string().trim().uuid().optional(),
            phoneNo: z
                .string()
                .trim()
                .nonempty()
                .length(10, 'Enter a valid phone number')
                .optional(),
            email: z
                .string()
                .trim()
                .email({ message: 'Enter a valid e-mail' })
                .optional(),
        }),
    }),
});
