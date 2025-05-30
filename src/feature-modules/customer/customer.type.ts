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

    limit: z.coerce.number().default(10).optional(),
    page: z.coerce.number().default(1).optional(),
});

export type Customer = z.infer<typeof ZCustomer>;

export const ZFindCustomers = z.object({
    query: ZCustomer.pick({
        name: true,
        email: true,
        limit: true,
        page: true,
    }).optional(),
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

export const ZCustomerMeter = z.object({
    id: z.string().uuid().optional(),

    userId: z.string().uuid().optional(),
    meterId: z.string().uuid(),

    name: z.string().trim().nonempty().optional(),
    email: z
        .string()
        .trim()
        .email({ message: 'Enter a valid e-mail' })
        .optional(),
    meterName: z.string().trim().nonempty().optional(),

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),

    limit: z.coerce.number().default(10).optional(),
    page: z.coerce.number().default(1).optional(),
});

export type CustomerMeter = z.infer<typeof ZCustomerMeter>;

export const ZRegisterCustomerMeter = z.object({
    userId: z.string().uuid().optional(),
    meterId: z.string().uuid(),
});

export const ZFindCustomerMeters = z.object({
    query: ZCustomerMeter.pick({
        name: true,
        email: true,
        meterName: true,
        limit: true,
        page: true,
    }).optional(),
});
