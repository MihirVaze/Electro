import z from 'zod';

const GrievanceReportQuery = z.object({
    typeIds: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .transform((val) => {
            if (val === undefined) return undefined;
            if (Array.isArray(val)) return val;
            return [val];
        }),
    period: z.enum(['week', 'month', 'year']).optional(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
    locations: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .transform((val) => {
            if (val === undefined) return undefined;
            if (Array.isArray(val)) return val;
            return [val];
        }),
});

export const ZGrievanceReportQuery = z.object({ query: GrievanceReportQuery });

export type GrievanceReportOptions = z.infer<typeof GrievanceReportQuery>;

export const ZMeterReportOptions = z.object({
    meterIds: z
        .union([z.string().uuid(), z.array(z.string().uuid())])
        .optional()
        .transform((val) => (val === undefined ? undefined : Array.isArray(val) ? val : [val])),

    sortBy: z.enum(['usageCountAsc', 'usageCountDesc']).optional(),
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).default(10),
});


export type MeterReportOptions = z.infer<typeof ZMeterReportOptions>;


export const ZworkerReportOption = z.object({
    cityIds: z
        .union([z.string().uuid(), z.array(z.string().uuid())])
        .optional()
        .transform((val) => (val === undefined ? undefined : Array.isArray(val) ? val : [val])),

    sortBy: z.enum(['workerCountAsc', 'workerCountDesc']).optional(),
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).default(10),
});


export type WorkerReportOptions = z.infer<typeof ZworkerReportOption>;