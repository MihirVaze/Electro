import { z } from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZGrievanceType = ZBaseSchema.partial().extend({
    id: z.string().trim().uuid().optional(),
    name: z.string().trim(),
});

export type GrievanceType = z.infer<typeof ZGrievanceType>;

export const ZFindGrievanceTypes = z.object({
    query: z.object({
        name: z.string().trim().optional(),
    }),
});

export type FindGrievanceTypes = z.infer<typeof ZFindGrievanceTypes>;

export const ZFindGrievanceType = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
});

export type FindGrievanceType = z.infer<typeof ZFindGrievanceType>;

export const ZCreateGrievanceType = z.object({
    body: ZGrievanceType.pick({
        name: true,
    }),
});

export type CreateGrievanceType = z.infer<typeof ZCreateGrievanceType>;

export const ZUpdateGrievanceType = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
    body: z.object({
        name: z.string().trim().nonempty(),
    }),
});

export type UpdateGrievanceType = z.infer<typeof ZUpdateGrievanceType>;

export const ZDeleteGrievanceType = z.object({
    params: z.object({
        id: z.string().trim().uuid().nonempty(),
    }),
});

export type DeleteGrievanceType = z.infer<typeof ZGrievanceType>;
