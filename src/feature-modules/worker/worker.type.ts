import { z } from 'zod';

export const ZWorker = z.object({
    id: z.string().trim().uuid().optional(),

    userId: z.string().trim().uuid().nonempty(),
    cityId: z.string().trim().uuid().nonempty(),

    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type Worker = z.infer<typeof ZWorker>;

export const ZFindWorker = z.object({
    query: ZWorker.pick({
        userId: true,
    }),
});

export const ZRegisterWorker = z.object({
    body: ZWorker.pick({
        userId: true,
        cityId: true,
    }),
});

export const ZupdateWorker = z.object({
    body: ZWorker.pick({
        userId: true,
        cityId: true,
    }),
});

export const ZDeleteWorker = z.object({
    params: ZWorker.pick({
        id: true,
    }),
});
