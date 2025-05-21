import z from 'zod';
import { ZUser } from '../user/user.types';

export const ZCredentials = ZUser.pick({
    email: true,
    password: true
})

export type Credentials = z.infer<typeof ZCredentials>;

export const ZCreateUser = ZUser.pick({
    email: true,
    name: true,
    phoneNo: true,
})
export type CreateUser = z.infer<typeof ZCreateUser>;

export const ZChangePassWord = z.object({
    body:z.object({
    id: z.string().optional(),
    oldPassword: z.string().nonempty().min(5, { message: 'password must be 5 chars long' }),
    newPassword: z.string().nonempty().min(5, { message: 'password must be 5 chars long' })
    })
})
export type ChangePassWord = z.infer<typeof ZChangePassWord>;

export type Payload = {
    id: string,
    roleId: string[]
}