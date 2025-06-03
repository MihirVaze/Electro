import { z } from 'zod';
import { ZBaseSchema } from '../../utility/base-schema';

export const Zmeter = ZBaseSchema.partial().extend({
    name: z.string().trim().min(1, { message: 'Name cannot be blank' }),
    image: z.string().nonempty(),
    basePrice: z.coerce.number().positive(),
    pricePerUnit: z.coerce.number().positive(),
    requiredPhotos: z.coerce.number().positive(),
});

export type Meter = z.infer<typeof Zmeter>;

export const ZFilterMeter = z.object({
    name: z.string().optional(),
    basePrice: z.coerce.number().optional(),
    pricePerUnit: z.coerce.number().optional(),
    requiredPhotos: z.coerce.number().optional(),
    isDeleted: z.coerce.boolean().optional(),
});
export type ZFilterMeterType = z.infer<typeof ZFilterMeter>;

export const ZUpdateMeter = z.object({
    name: z.string().optional(),
    basePrice: z.coerce.number().optional(),
    pricePerUnit: z.coerce.number().optional(),
    requiredPhotos: z.coerce.number().optional(),
    isDeleted: z.coerce.boolean().optional(),
});

export type Update = z.infer<typeof ZUpdateMeter>;

export const ZValidateCreateMeter = z.object({
    body: Zmeter.omit({
        image: true,
    }),
});

export const ZValidateUpdateMeter = z.object({
    body: Zmeter.optional(),
});

export const ZValidateMeterId = z.object({
    params: Zmeter.pick({
        id: true,
    }),
});

export const ZValidateGetPaginatedMeters = z.object({
    query: ZFilterMeter.extend({
        limit: z.coerce.number().optional(),
        page: z.coerce.number().optional(),
    }),
});
