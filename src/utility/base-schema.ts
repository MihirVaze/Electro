import { z } from 'zod';

export const ZBaseSchema = z.object({
    id: z.string().trim().uuid(),
    isDeleted: z.boolean().default(false),
    deletedBy: z.string().trim().uuid(),
    restoredBy: z.string().trim().uuid(),
    createdBy: z.string().trim().uuid(),
    updatedBy: z.string().trim().uuid(),
    deletedAt: z.date(),
    restoredAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
