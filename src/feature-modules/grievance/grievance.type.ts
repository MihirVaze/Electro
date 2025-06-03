import { z } from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

<<<<<<< HEAD
export const ZGrievance = z.object({
    id: z.string().trim().uuid().optional(),

=======
export const ZGrievance = ZBaseSchema.partial().extend({
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
    userId: z.string().trim().uuid(),
    grievanceTypeId: z.string().trim().uuid(),
    comments: z.string().optional(),
    assignedTo: z.string().trim().uuid().optional(),
    escalatedTo: z.string().trim().uuid().optional(),
    status: z
        .enum(['pending', 'in-progress', 'resolved'])
        .default('pending')
        .optional(),
<<<<<<< HEAD
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
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
=======
    location: z.string().trim().uuid().optional(),
    action: z.enum(['pick', 'escalate', 'resolved']).optional(),
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
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
<<<<<<< HEAD
        assignedTo: true,
        escalatedTo: true,
        limit: true,
        page: true,
    }).partial(),
=======
    })
        .partial()
        .extend({
            limit: z.coerce.number().default(10).optional(),
            page: z.coerce.number().default(1).optional(),
        }),
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
});

export const ZAssignOrEscalateGrievance = z.object({
    params: ZGrievance.pick({
        id: true,
    }),
    body: ZGrievance.pick({
        action: true,
    }),
});
<<<<<<< HEAD
=======

export const ZDeleteGrievance = z.object({
    params: ZGrievance.pick({
        id: true,
    }),
});
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
