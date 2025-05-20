import z from 'zod';

export const ZRole = z.object({
    id: z.string().uuid().optional(),
    role: z.enum(['admin'])
});
export type Role = z.infer<typeof ZRole>;

export type RoleEnum = 'admin'