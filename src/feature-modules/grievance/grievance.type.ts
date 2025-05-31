import { z } from 'zod';

export const ZGrievance = z.object({
    id: z.string().trim().uuid().optional(),

    userId: z.string().trim().uuid(),
    grievanceTypeId: z.string().trim().uuid(),
    comments: z.string().optional(),

    status: z
        .enum(['pending', 'in-progress', 'resolved'])
        .default('pending')
        .optional(),
    assignedTo: z.string().trim().uuid().nullable().optional(),
    escalatedTo: z.string().trim().uuid().nullable().optional(),
    location: z.string().optional(),

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type Grievance = z.infer<typeof ZGrievance>;

export const ZRaiseGrievance = z.object({
    body: z.object({
        grievanceTypeId: z.string().trim().uuid(),
        comments: z.string().optional(),
    }),
});

export type RaiseGrievance = z.infer<typeof ZRaiseGrievance>;

export const ZFindGrievance = z.object({
    query: z.object({
        status: z
            .enum(['pending', 'in-progress', 'resolved'])
            .default('pending')
            .optional(),
        assignedTo: z.string().trim().uuid().optional(),
        escalatedTo: z.string().trim().uuid().optional(),
        location: z.string().optional(),
    }),
});

export type FindGrievance = z.infer<typeof ZFindGrievance>;
