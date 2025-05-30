import { z } from 'zod';

export const Grievance = z.object({
    id: z.string().trim().uuid().optional(),

    userId: z.string().trim().uuid(),
    grievanceTypeId: z.string().trim().uuid(),
    comments: z.string().optional(),

    status: z
        .enum(['pending', 'in-progress', 'escalated', 'resolved', 'rejected'])
        .default('pending')
        .optional(),
    assignedTo: z.string().trim().uuid().optional(),
    escalatedTo: z.string().trim().uuid().optional(),
    location: z.string().optional(),

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type Grievance = z.infer<typeof Grievance>;
