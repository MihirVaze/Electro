import { SchemaName } from '../../utility/umzug-migration';
import z from 'zod';
import { ZUser } from '../user/user.types';

export const Credentials = ZUser.pick({
    email: true,
    password: true,
});

export const ZCredentials = z.object({
    body: Credentials.pick({
        email: true,
        password: true,
    }),
});

export type Credentials = z.infer<typeof Credentials>;

export const ZCreateUser = ZUser.pick({
    email: true,
    name: true,
    phoneNo: true,
});
export type CreateUser = z.infer<typeof ZCreateUser>;

export const ChangePassWord = z.object({
    id: z.string().optional(),
    oldPassword: z
        .string()
        .nonempty()
        .min(5, { message: 'password must be 5 chars long' }),
    newPassword: z
        .string()
        .nonempty()
        .min(5, { message: 'password must be 5 chars long' }),
});

export const ZChangePassWord = z.object({
    body: ChangePassWord.pick({
        id: true,
        oldPassword: true,
        newPassword: true,
    }),
});

export type ChangePassWord = z.infer<typeof ChangePassWord>;

export type Payload = {
    id: string;
    roleId: string[];
    schema: SchemaName;
};
