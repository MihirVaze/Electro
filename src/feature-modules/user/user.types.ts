import z from 'zod';

export const ZUser = z.object({
    id: z.string().uuid().optional(),
    name: z.string().nonempty(),
    phone_num: z.string().nonempty().length(10, "Enter a valid phone number"),
    address: z.string().nonempty(),
    email: z.string().email({ message: 'Enter a valid e-mail' }),
    password: z.string().min(5, { message: 'password must be 5 chars long' }),
    role_id: z.string().optional(),
    is_deleted: z.boolean().default(false)
});
export type User = z.infer<typeof ZUser>;

export const ZEditUser = z.object({
    id: z.string().uuid().optional(),
    name: z.string().nonempty().optional(),
    phone_num: z.string().length(10, "Enter a valid phone number").optional(),
    address: z.string().nonempty().optional(),
    email: z.string().email({ message: 'Enter a valid e-mail' }).optional()
});

export type EditUser = z.infer<typeof ZEditUser>;