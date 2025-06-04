import { z } from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';
import { ZLocationType } from '../userLocation/userLocation.type';

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

const GetGrievance = ZGrievance.pick({
    status: true,
})
    .partial()
    .extend({
        limit: z.coerce.number().default(10),
        page: z.coerce.number().default(1),

        locationType: ZLocationType.default('city'),
        searchTerm: z.string().optional(),
    });

export const ZGetGrievance = z.object({
    query: GetGrievance,
});

export type GetGrievance = z.infer<typeof GetGrievance>;

export const ZAssignOrEscalateGrievance = z.object({
    params: ZGrievance.pick({
        id: true,
    }),
    body: ZGrievance.pick({
        action: true,
    }),
});

export const ZDeleteGrievance = z.object({
    params: ZGrievance.pick({
        id: true,
    }),
});
