import z from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const ZClientUIData = ZBaseSchema.partial().extend({
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

export const Zupdate = z.object({
    baseColor: z
        .string()
        .trim()
        .length(7, 'enter a valid hexadecimal colorcode')
        .optional(),
    accentColor: z
        .string()
        .trim()
        .length(7, 'enter a valid hexadecimal colorcode')
        .optional(),
    fontColor: z.string().trim().nonempty().optional(),
    baseFont: z.string().trim().url('enter a valid font URL').optional(),
    accentFont: z.string().trim().url('enter a valid font URL').optional(),
    logo: z.string().trim().optional(),
});

export const ZValidateClientUI = z.object({
    body: uiData,
    params: ZBaseSchema.pick({ id: true }),
});

export const ZvalidatePatch = z.object({
    body: Zupdate,
    params: ZBaseSchema.pick({ id: true }),
});
