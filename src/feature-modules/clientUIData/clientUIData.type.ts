import z from 'zod';

export const ZClientUIData = z.object({
    id: z.string().trim().uuid().optional(),
    clientId: z.string().trim().uuid(),
    baseColor: z
        .string()
        .trim()
        .length(7, 'enter a valid hexadecimal colorcode'),
    accentColor: z
        .string()
        .trim()
        .length(7, 'enter a valid hexadecimal colorcode'),
    fontColor: z.string().trim().nonempty(),
    baseFont: z.string().trim().url('enter a valid font URL'),
    accentFont: z.string().trim().url('enter a valid font URL'),
    logo: z.string().trim().optional(),
    isDeleted: z.boolean().default(false).optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
});

export type ClientUIData = z.infer<typeof ZClientUIData>;

export const uiData = ZClientUIData.pick({
    baseColor: true,
    accentColor: true,
    fontColor: true,
    baseFont: true,
    accentFont: true,
    logo: true,
});

export type UIData = z.infer<typeof uiData>;
