import { z } from 'zod';

export const ZGrievanceType = z.object({
    id: z.string().trim().uuid().optional(),
    name: z.string().trim(),

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
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
