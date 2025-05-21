import z from 'zod';

export const ZUser = z.object({
    id: z.string().trim().uuid().optional(),

    name: z.string().trim().nonempty(),
    phoneNo: z.string().trim().nonempty().length(10, "Enter a valid phone number"),
    email: z.string().trim().email({ message: 'Enter a valid e-mail' }),
    password: z.string().trim().min(5, { message: 'password must be 5 chars long' }),
    
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type User = z.infer<typeof ZUser>;