import z from 'zod';

export const ZClientUIData = z.object({
    id: z.string().trim().uuid().optional(),
    clientId: z.string().trim().uuid(),
    baseColor: z.string().trim().length(7, "enter a valid hexadecimal colorcode"),
    accentColor: z.string().trim().length(7, "enter a valid hexadecimal colorcode"),

    baseFont: z.string().trim().url("enter a valid font URL"),
    accentFont: z.string().trim().url("enter a valid font URL"),

    logo: z.string().trim().optional()
});

export type ClientUIData = z.infer<typeof ZClientUIData>;