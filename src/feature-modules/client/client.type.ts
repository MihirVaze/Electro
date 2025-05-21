import z from 'zod';

export const ZClient = z.object({
    id: z.string().trim().uuid().optional(),
    clientName: z.string().trim(),
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type Client = z.infer<typeof ZClient>;

