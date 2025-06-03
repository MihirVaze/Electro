import { SchemaName } from '../../utility/umzug-migration';
import {
    Op,
    WhereOptions,
    fn,
    col,
    literal,
    FindOptions,
    Sequelize,
} from 'sequelize';
import { Grievance } from '../grievance/grievance.type';
import {
    GrievanceReportOptions,
    RevenueReportEntry,
    TimePeriod,
} from './report.types';
import grievanceService from '../grievance/grievance.service';
import { ClientBillSchema } from '../billing/clientBill/clientBill.schema';
import { ClientSchema } from '../client/client.schema';
import clientBillService from '../billing/clientBill/clientBill.service';

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
            const periodLabel = fn(
                'DATE_TRUNC',
                literal(`'${truncUnit}'`),
                col('createdAt'),
            );

            const findOptions: FindOptions<Grievance> = {
                attributes: [
                    'grievanceTypeId',
                    [fn('COUNT', col('id')), 'count'],
                    [periodLabel, 'periodLabel'],
                ],
                where,
                group: ['grievanceTypeId', literal(`"periodLabel"`) as any],
                order: [
                    [literal(`"periodLabel"`), 'ASC'],
                    [literal('count'), 'DESC'],
                ],
                raw: true,
            };

            const results = await grievanceService.GrievanceReport(
                schema,
                findOptions,
            );
            return results;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async electroRevenueReport(timePeriod: TimePeriod = 'month') {
        try {
            const endDate = new Date();
            let startDate: Date;
            switch (timePeriod) {
                case 'month':
                    startDate = new Date(
                        endDate.getFullYear(),
                        endDate.getMonth() - 1,
                        1,
                    );
                    break;
                case 'halfYear':
                    startDate = new Date(
                        endDate.getFullYear(),
                        endDate.getMonth() - 6,
                        1,
                    );
                    break;
                case 'year':
                    startDate = new Date(
                        endDate.getFullYear() - 1,
                        endDate.getMonth(),
                        1,
                    );
                    break;
                default:
                    throw 'Invalid time period specified';
            }

            const where: WhereOptions<ClientBillSchema> = {
                isDeleted: false,
                billingDate: {
                    [Op.between]: [startDate, endDate],
                },
            };

            const options: FindOptions<ClientBillSchema> = {
                attributes: [
                    'clientId',
                    [col('Client.clientName'), 'clientName'],
                    [fn('SUM', col('total')), 'revenue'],
                    [
                        literal(`(
                                    SUM("total") * 100.0 / (
                                        SELECT SUM("total")
                                        FROM "ClientBill"
                                        WHERE "billingDate" 
                                        BETWEEN 
                                        '${startDate.toISOString()}' 
                                        AND 
                                        '${endDate.toISOString()}'
                                    )
                                )`),
                        'percentage',
                    ],
                ],
                where,
                include: [
                    {
                        model: ClientSchema,
                        attributes: [],
                    },
                ],
                group: ['clientId', 'Client.clientName'],
                raw: true,
            };
            const result = await clientBillService.clientBillingReport(
                options,
                'public',
            );

            return result.rows;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default new ReportServices();
