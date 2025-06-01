export type GrievanceReportOptions = {
    typeIds?: string[];
    period?: 'week' | 'month' | 'year';
    from?: Date;
    to?: Date;
    locations?: string[];
};
