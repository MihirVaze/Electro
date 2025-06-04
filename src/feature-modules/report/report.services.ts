import { SchemaName } from '../../utility/umzug-migration';
import { Op, WhereOptions, fn, col, literal, FindOptions } from 'sequelize';
import { Grievance } from '../grievance/grievance.type';
import {
    GrievanceReportOptions,
    MeterReportOptions,
    TimePeriod,
    WorkerReportOptions,
} from './report.types';
import grievanceService from '../grievance/grievance.service';
import { CustomerMeter } from '../customer/customer.type';
import { MeterSchema } from '../meter/meter.schema';
import customerRepo from '../customer/customer.repo';
import { CitySchema } from '../location/location.schema';
import workerRepo from '../worker/worker.repo';
import { ClientSchema } from '../client/client.schema';
import clientBillService from '../billing/clientBill/clientBill.service';
import { CreateClientBill } from '../billing/clientBill/clientBill.types';
import { Worker } from '../worker/worker.type';

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

    async meterUsageReport(
        schema: SchemaName,
        options: MeterReportOptions = {
            limit: 10,
            page: 1,
        },
    ) {
        const where: WhereOptions<CustomerMeter> = {
            isDeleted: false,
        };

        if (options.meterIds && options.meterIds.length > 0) {
            where.meterId = {
                [Op.in]: options.meterIds,
            };
        }
        const limit = options.limit;
        const offset = (options.page - 1) * options.limit;

        const findOptions: FindOptions<CustomerMeter> = {
            attributes: ['meterId', [fn('COUNT', col('id')), 'usageCount']],
            where,
            include: [
                {
                    model: MeterSchema.schema(schema),
                    attributes: ['name', 'pricePerUnit'],
                },
            ],
            group: ['meterId'],
            raw: true,
            limit,
            offset,
        };

        if (options.sortBy === 'usageCountAsc') {
            findOptions.order = [[fn('COUNT', col('id')), 'ASC']];
        } else if (options.sortBy === 'usageCountDesc') {
            findOptions.order = [[fn('COUNT', col('id')), 'DESC']];
        }

        const result = await customerRepo.getAllCustomerMeter(
            findOptions,
            schema,
        );
        return result;
    }

    async workerReport(
        schema: SchemaName,
        options: WorkerReportOptions = {
            limit: 10,
            page: 1,
        },
    ) {
        const where: WhereOptions<Worker> = {
            isDeleted: false,
        };

        if (options.cityIds && options.cityIds.length > 0) {
            where.cityId = {
                [Op.in]: options.cityIds,
            };
        }

        const limit = options.limit;
        const offset = (options.page - 1) * options.limit;

        const findOptions: FindOptions<Worker> = {
            attributes: [
                [fn('COUNT', col('Worker.id')), 'workerCount'],
                [col('City.name'), 'cityName'],
            ],
            where,
            include: [
                {
                    model: CitySchema.schema(schema),
                    attributes: ['name'],
                },
            ],
            group: ['City.id'],
            raw: true,
            limit,
            offset,
        };

        if (options.sortBy === 'workerCountAsc') {
            findOptions.order = [[fn('COUNT', col('Worker.id')), 'ASC']];
        } else if (options.sortBy === 'workerCountDesc') {
            findOptions.order = [[fn('COUNT', col('Worker.id')), 'DESC']];
        }

        const result = await workerRepo.getAll(findOptions, schema);
        return result;
    }

    async electroRevenueReport(
        timePeriod: TimePeriod = 'month',
        schema: SchemaName = 'public',
    ) {
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

            const where: WhereOptions<CreateClientBill> = {
                isDeleted: false,
                billingDate: {
                    [Op.between]: [startDate, endDate],
                },
            };

            const options: FindOptions<CreateClientBill> = {
                attributes: [
                    'clientId',
                    [col('Client.clientName'), 'clientName'],
                    [fn('SUM', col('total')), 'revenue'],
                    [
                        literal(`(
                                    SUM("total") * 100.0 / 
                                    (
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
                schema,
            );

            return result.rows;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default new ReportServices();
