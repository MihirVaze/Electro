import z from 'zod';

export const ZCustomer = z.object({
    id: z.string().trim().uuid().optional(),
    cityId: z.string().trim().uuid().nonempty(),
    address: z.string().trim().nonempty(),

    userId: z.string().uuid().optional(),

    name: z.string().trim().nonempty().optional(),
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
    password: z
        .string()
        .trim()
        .min(5, { message: 'password must be 5 chars long' })
        .optional(),

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type Customer = z.infer<typeof ZCustomer>;

export const ZFindCustomer = z.object({
    query: ZCustomer.pick({
        name: true,
        email: true,
    }),
});

export const ZRegisterCustomer = z.object({
    body: ZCustomer.pick({
        name: true,
        cityId: true,
        address: true,
        phoneNo: true,
        email: true,
        password: true,
    }),
});

export const ZUpdateCustomer = z.object({
    body: ZCustomer.pick({
        name: true,
        email: true,
        phoneNo: true,
    }).optional(),
});
