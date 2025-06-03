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

const ERevenueReportOptions = z.object({
    period: z.enum(['month', 'halfYear', 'year']).optional(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
});

export const ZERevenueReportOptions = z.object({
    query: ERevenueReportOptions,
});

export type ERevenueReportOptions = z.infer<typeof ERevenueReportOptions>;
