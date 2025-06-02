import { z } from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZGrievance = ZBaseSchema.partial().extend({
    userId: z.string().trim().uuid(),
    grievanceTypeId: z.string().trim().uuid(),
    comments: z.string().optional(),
    assignedTo: z.string().trim().uuid().optional(),
    escalatedTo: z.string().trim().uuid().optional(),
    status: z
        .enum(['pending', 'in-progress', 'resolved'])
        .default('pending')
        .optional(),
    location: z.string().trim().uuid().optional(),
    action: z.enum(['pick', 'escalate', 'resolved']).optional(),
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
    })
        .partial()
        .extend({
            limit: z.coerce.number().default(10).optional(),
            page: z.coerce.number().default(1).optional(),
        }),
});

export const ZAssignOrEscalateGrievance = z.object({
    params: ZGrievance.pick({
        id: true,
    }),
    body: ZGrievance.pick({
        action: true,
    }),
});
