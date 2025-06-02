import { z } from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZWorker = ZBaseSchema.partial().extend({
    workerName: z.string().trim().nonempty(),

    userId: z.string().trim().uuid().nonempty().optional(),
    cityId: z.string().trim().uuid().nonempty(),
    customerCount: z.coerce.number().min(0).optional(),

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
        cityId: true,
    }),
});

export const ZupdateWorker = z.object({
    body: ZWorker.pick({
        workerName: true,
        email: true,
        phoneNo: true,
        cityId: true,
    }),
});

export const ZDeleteWorker = z.object({
    params: ZWorker.pick({
        id: true,
    }),
});
