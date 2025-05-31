import z from 'zod';
import { ZUser } from '../user/user.types';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZClient = z
    .object({
        clientName: z.string().trim().nonempty(),
        schemaName: z.string().trim().nonempty(),
        userId: z.string().uuid().optional(),
        limit: z.coerce.number().default(10),
        page: z.coerce.number().default(1),
    })
    .extend(ZUser.shape);

export const ZCreateClient = ZClient.pick({
    clientName: true,
    schemaName: true,
    userId: true,
}).merge(ZBaseSchema.partial());

export const ZRegisterClient = ZClient.pick({
    clientName: true,
    email: true,
    phoneNo: true,
    schemaName: true,
});

export const ZValidateRegisterClient = z.object({
    body: ZRegisterClient,
});

export const ZFindClient = z.object({
    params: ZClient.pick({
        userId: true,
    }),
});

export const ZFindClients = z.object({
    query: ZClient.pick({
        clientName: true,
        email: true,
        limit: true,
        page: true,
    }).partial(),
});

export const ZUpdateClient = ZClient.pick({
    clientName: true,
    email: true,
    phoneNo: true,
}).partial();

export const ZValidateUpdateClient = z.object({
    body: ZUpdateClient,
});

export type Client = z.infer<typeof ZClient>;
export type CreateClient = z.infer<typeof ZCreateClient>;
export type RegisterClient = z.infer<typeof ZRegisterClient>;
export type UpdateClient = z.infer<typeof ZUpdateClient>;
