import { SchemaName } from '../../utility/umzug-migration';
import { Op, WhereOptions, fn, col, literal, FindOptions } from 'sequelize';
import { Grievance } from '../grievance/grievance.type';
import { GrievanceReportOptions } from './report.types';
import grievanceService from '../grievance/grievance.service';

class ReportServices {
    async grievanceReport(
        schema: SchemaName,
        options: GrievanceReportOptions = {},
    ) {
        try {
            const where: WhereOptions<Grievance> = { isDeleted: false };
            if (options.typeIds && options.typeIds.length > 0) {
                where.grievanceTypeId = { [Op.in]: options.typeIds };
            }

            if (options.locations && options.locations.length > 0) {
                where.location = { [Op.in]: options.locations };
            }

            let from = options.from;
            let to = options.to;
            if (!from && !to) {
                const to = new Date();
                const from = new Date(to);
                from.setMonth(from.getMonth() - 1);
            }
            if (from && to) {
                where.createdAt = { [Op.between]: [from, to] };
            } else if (from) {
                where.createdAt = { [Op.gte]: from };
            } else if (to) {
                where.createdAt = { [Op.lte]: to };
            }

            let truncUnit = options.period || 'month';
            const trunkColumn = fn(
                'DATE_TRUNC',
                literal(truncUnit),
                col('createdAt'),
            );

            const findOptions: FindOptions<Grievance> = {
                attributes: [
                    'grievanceTypeId',
                    [fn('COUNT', col('id')), 'count'],
                    [trunkColumn, 'trunkColumn'],
                ],
                where,
                group: ['grievanceTypeId', literal('periodLabel') as any],
                order: [literal('count'), 'ASC'],
                // raw: true,
            };

            const results = await grievanceService.GrievanceReport(
                schema,
                findOptions,
            );
            return results;
        } catch (e) {
            throw e;
        }
    }
}

export default new ReportServices();
