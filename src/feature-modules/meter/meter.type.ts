import { z } from "zod";

export const Zmeter=z.object({
    id:z.string().uuid().optional(),
    name:z.string().trim().min(1,{message:"Name cannot be blank"}),
    image:z.string().nonempty(),
    basePrice:z.number().positive(),
    pricePerUnit:z.number().positive(),
    requiredPhotos:z.number().positive(),
    isDeleted:z.boolean().optional(),
    deletedBy: z.string().trim().uuid().optional(),
    restoredBy: z.string().trim().uuid().optional(),
    createdBy: z.string().trim().uuid().optional(),
    updatedBy: z.string().trim().uuid().optional(),
    deletedAt: z.date().optional(),
    restoredAt: z.date().optional(),
})

export type Meter=z.infer<typeof Zmeter>

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


export type Update=z.infer<typeof ZUpdateMeter>