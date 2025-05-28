import { z } from 'zod';

export const ZWorker = z.object({
    id: z.string().trim().uuid().optional(),
    workerName: z.string().trim().nonempty(),

    userId: z.string().trim().uuid().nonempty().optional(),
    cityId: z.string().trim().uuid().nonempty(),

    phoneNo: z
        .string()
        .trim()
        .nonempty()
        .length(10, 'Enter a valid phone number')
        .optional(),
    email: z
        .string()
        .trim()
        .email({ message: 'Enter a valid e-mail' })
        .optional(),
    password: z
        .string()
        .trim()
        .min(5, { message: 'password must be 5 chars long' })
        .optional(),

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
        workerName: true,
        phoneNo: true,
        email: true,
        password: true,
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
