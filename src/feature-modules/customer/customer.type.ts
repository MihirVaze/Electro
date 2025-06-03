import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';
import { ZUser } from '../user/user.types';
import { Zmeter } from '../meter/meter.type';

export const ZCustomer = z
    .object({
        cityId: z.string().trim().uuid().nonempty(),
        address: z.string().trim().nonempty(),
        userId: z.string().uuid(),
    })
    .extend(ZUser.shape);

export const ZCreateCustomer = ZCustomer.pick({
    cityId: true,
    userId: true,
    address: true,
}).merge(ZBaseSchema.partial());

export const ZRegisterCustomer = ZCustomer.pick({
    name: true,
    email: true,
    phoneNo: true,
    cityId: true,
    address: true,
    createdBy: true,
});
export const ZValidateRegisterCustomer = z.object({
    body: ZRegisterCustomer.extend({ client: z.string().trim().nonempty() }),
});

export const ZFindCustomers = z.object({
    query: ZCustomer.pick({
        name: true,
        email: true,
    })
        .partial()
        .extend({
            limit: z.coerce.number().min(1),
            page: z.coerce.number().min(1),
        }),
});

export const ZFindCustomer = z.object({
    params: ZCustomer.pick({
        userId: true,
    }),
});

export const ZUpdateCustomer = ZCustomer.pick({
    userId: true,
    name: true,
    email: true,
    phoneNo: true,
});
export const ZValidateUpdateCustomer = z.object({
    body: ZUpdateCustomer,
});

export const ZCustomerMeter = z
    .object({
        userId: z.string().uuid().optional(),
        meterId: z.string().uuid(),
        name: z.string().trim().nonempty().optional(),
        email: z
            .string()
            .trim()
            .email({ message: 'Enter a valid e-mail' })
            .optional(),
        meterName: z.string().trim().nonempty().optional(),
        limit: z.coerce.number().default(10).optional(),
        page: z.coerce.number().default(1).optional(),
        meter: Zmeter.optional(),
        user: ZUser.optional(),
    })
    .merge(ZBaseSchema.partial());

export const ZRegisterCustomerMeter = z.object({
    userId: z.string().uuid().optional(),
    meterId: z.string().uuid(),
});

export const ZValidateRegisterCustomerMeter = z.object({
    body: ZRegisterCustomerMeter,
});

export const ZFindCustomerMeters = z.object({
    query: ZCustomerMeter.pick({
        name: true,
        email: true,
        meterName: true,
        limit: true,
        page: true,
    }).optional(),
});

export const ZCustomerWorker = z
    .object({
        userId: z.string().trim().uuid(),
        workerId: z.string().trim().uuid(),
        limit: z.coerce.number().default(10).optional(),
        page: z.coerce.number().default(1).optional(),
    })
    .merge(ZBaseSchema.partial());

export const ZFindCustomerWorker = z.object({
    query: ZCustomerWorker.pick({
        userId: true,
        workerId: true,
        limit: true,
        page: true,
    }).optional(),
});

export type Customer = z.infer<typeof ZCustomer>;
export type CreateCustomer = z.infer<typeof ZCreateCustomer>;
export type RegisterCustomer = z.infer<typeof ZRegisterCustomer>;
export type UpdateCustomer = z.infer<typeof ZUpdateCustomer>;
export type CustomerMeter = z.infer<typeof ZCustomerMeter>;
export type CustomerWorker = z.infer<typeof ZCustomerWorker>;
