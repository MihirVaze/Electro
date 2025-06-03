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

const TimePeriod = z.enum(['month', 'halfYear', 'year']).optional();

export const ZERevenueReportOptions = z.object({
    query: z.object({ period: TimePeriod }),
});

export type TimePeriod = z.infer<typeof TimePeriod>;

export type RevenueReportEntry = {
    clientId: string;
    clientName: string;
    revenue: number;
    percentage: number;
};
