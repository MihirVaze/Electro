import z from 'zod';

export const ZUser = z.object({
    id: z.string().trim().uuid().optional(),

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

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type User = z.infer<typeof ZUser>;

const ZUserRole = z.object({
    id: z.string().trim().uuid().optional(),

    userId: z.string().trim().uuid(),
    roleId: z.string().trim().uuid(),

    isDeleted: z.boolean().default(false).optional(),

    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),

    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type UserRole = z.infer<typeof ZUserRole>;

const ZUserRoleLocation = z.object({
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
