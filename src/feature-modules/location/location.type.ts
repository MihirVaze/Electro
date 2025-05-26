import z from 'zod';

export const ZState = z.object({
  id: z.string().trim().uuid().optional(),
  name: z.string().trim(),
  isDeleted: z.boolean().default(false),
  deletedBy: z.string().trim().uuid().optional(),
  restoredBy: z.string().trim().uuid().optional(),
  createdBy: z.string().trim().uuid().optional(),
  updatedBy: z.string().trim().uuid().optional(),
  deletedAt: z.date().optional(),
  restoredAt: z.date().optional(),
});

export type State = z.infer<typeof ZState>;

export const ZDistrict = z.object({
  id: z.string().trim().uuid().optional(),
  stateId: z.string().trim().uuid(),
  name: z.string().trim(),
  isDeleted: z.boolean().default(false),
  deletedBy: z.string().trim().uuid().optional(),
  restoredBy: z.string().trim().uuid().optional(),
  createdBy: z.string().trim().uuid().optional(),
  updatedBy: z.string().trim().uuid().optional(),
  deletedAt: z.date().optional(),
  restoredAt: z.date().optional(),
});

export type District = z.infer<typeof ZDistrict>;

export const ZCity = z.object({
  id: z.string().trim().uuid().optional(),
  districtId: z.string().trim().uuid(),
  name: z.string().trim(),
  isDeleted: z.boolean().default(false),
  deletedBy: z.string().trim().uuid().optional(),
  restoredBy: z.string().trim().uuid().optional(),
  createdBy: z.string().trim().uuid().optional(),
  updatedBy: z.string().trim().uuid().optional(),
  deletedAt: z.date().optional(),
  restoredAt: z.date().optional(),
});

export type City = z.infer<typeof ZCity>;
