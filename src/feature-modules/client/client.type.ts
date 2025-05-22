import z from 'zod';

export const ZClient = z.object({
    id: z.string().trim().uuid().optional(),
    clientName: z.string().trim().nonempty(),
    schemaName: z.string().trim().nonempty(),

    userId: z.string().uuid(),

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),

    phoneNo: z.string().trim().nonempty().length(10, "Enter a valid phone number").optional(),
    email: z.string().trim().email({ message: 'Enter a valid e-mail' }).optional(),
    password: z.string().trim().min(5, { message: 'password must be 5 chars long' }).optional(),

});

export type Client = z.infer<typeof ZClient>;


export const ZFindClient = z.object({
    query: ZClient.pick({
        clientName: true,
    })
})