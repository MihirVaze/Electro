import { v4 as uuidv4 } from 'uuid';
import { Consumption, Filter, Update } from './conumption.type';
import consumptionRepo from './consumption.repo';
import { CONSUMPTION_RESPONSES } from './consumption.response';
// import { partialUtil } from 'zod/dist/types/v3/helpers/partialUtil';
import { Op, WhereOptions } from 'sequelize';
import { SchemaName } from '../../utility/umzug-migration';
import { CustomerMeterSchema } from '../customer/customer.schema';
import { MeterSchema } from '../meter/meter.schema';

class ConsumptionService {
    async createConsumption(data: Consumption, userId: string, schema: string) {
        try {
            const payload = {
                ...data,
                id: uuidv4(),
                createdBy: userId,
            };
            const result = await consumptionRepo.createConsumption(
                payload,
                schema,
            );
            if (!result) throw CONSUMPTION_RESPONSES.CREATION_FAILS;
            return CONSUMPTION_RESPONSES.CONSUMPTION_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllConsumptions(
        limit: number,
        page: number,
        filter: Partial<Consumption>,
        schema: string,
    ) {
        const offset = (page - 1) * limit;
        const where: WhereOptions<Consumption> = {};

        if (filter.unitsUsed) {
            where.unitsUsed = { [Op.gte]: filter.unitsUsed };
        }

        if (typeof filter.isDeleted === 'boolean') {
            where.isDeleted = filter.isDeleted;
        }

        return consumptionRepo.getAllConsumptions(
            { where, limit, offset },
            schema,
        );
    }

    async getOneConsumption(id: string, schema: string) {
        try {
            const result = await consumptionRepo.getOneConsumption(
                { where: { id } },
                schema,
            );
            if (!result) throw CONSUMPTION_RESPONSES.CONSUMPTION_NOT_FOUND;
            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateConsumption(
        update: Update,
        id: string,
        userId: string,
        schema: string,
    ) {
        try {
            const result = await consumptionRepo.updateConsumption(
                {
                    ...update,
                    updatedBy: userId,
                },
                { where: { id } },
                schema,
            );
            if (result[0] === 0)
                throw CONSUMPTION_RESPONSES.CONSUMPTION_NOT_FOUND;
            return CONSUMPTION_RESPONSES.CONSUMPTION_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteConsumption(id: string, userId: string, schema: string) {
        try {
            const result = await consumptionRepo.updateConsumption(
                {
                    isDeleted: true,
                    deletedBy: userId,
                    deletedAt: new Date(),
                },
                { where: { id } },
                schema,
            );
            if (result[0] === 0) throw CONSUMPTION_RESPONSES.CREATION_FAILS;
            return CONSUMPTION_RESPONSES.CONSUMPTION_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getConsumptionForBillingCycle(schema: SchemaName) {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const startDate = new Date(currentYear, currentMonth - 1, 25);
        const endDate = new Date(
            currentYear,
            currentMonth,
            24,
            23,
            59,
            59,
            999,
        );

        return await consumptionRepo.getAllConsumptions(
            {
                where: {
                    updatedAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                include: [
                    {
                        model: CustomerMeterSchema,
                        as: 'customerMeter',
                        required: true,
                        include: [
                            {
                                model: MeterSchema,
                                as: 'meter',
                                required: true,
                            },
                        ],
                    },
                ],
                raw: true,
            },
            schema,
        );
    }

}

export default new ConsumptionService();
