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

    limit: z.coerce.number().default(10).optional(),
    page: z.coerce.number().default(1).optional(),

    action: z.enum(['pick', 'escalate']).optional(),

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
    query: ZGrievance.pick({
        status: true,
        assignedTo: true,
        escalatedTo: true,
        limit: true,
        page: true,
    }).partial(),
});

export const ZAssignOrEscalateGrievance = z.object({
    params: ZGrievance.pick({
        id: true,
    }),
    body: ZGrievance.pick({
        action: true,
    }),
});
