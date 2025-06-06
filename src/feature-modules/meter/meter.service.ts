import { Op, WhereOptions } from 'sequelize';

import meterRepo from './meter.repo';
import { Meter } from './meter.type';
import { METER_RESPONSES } from './meter.response';
import { v4 } from 'uuid';
import { EXCLUDED_KEYS } from '../../utility/base-schema';

class MeterService {
    async findOneMeter(meter: Partial<Meter>, schema: string) {
        const record = await meterRepo.get(
            {
                where: { id: meter.id, isDeleted: false },
                attributes: {
                    exclude: ['isDeleted', 'deletedBy', 'deletedAt'],
                },
            },
            schema,
        );
        if (!record) throw METER_RESPONSES.METER_NOT_FOUND;
        return record.dataValues;
    }

    async getMeters(
        limit: number,
        page: number,
        filter: Partial<Meter>,
        schema: string,
    ) {
        const offset = (page - 1) * limit;
        const where: WhereOptions<Meter> = {};

        if (filter.name) {
            where.name = { [Op.iLike]: `%${filter.name}%` };
        }

        if (typeof filter.isDeleted === 'boolean') {
            where.isDeleted = filter.isDeleted;
        }

        if (filter.basePrice !== undefined) {
            where.basePrice = { [Op.gte]: filter.basePrice };
        }

        if (filter.pricePerUnit !== undefined) {
            where.pricePerUnit = { [Op.gte]: filter.pricePerUnit };
        }

        if (filter.requiredPhotos !== undefined) {
            where.requiredPhotos = { [Op.gte]: filter.requiredPhotos };
        }

        return meterRepo.getAll(
            {
                where,
                attributes: {
                    exclude: EXCLUDED_KEYS,
                },
                limit,
                offset,
            },
            schema,
        );
    }

    async createMeter(meter: Meter, schema: string) {
        const meterDetails = {
            id: v4(),
            ...meter,
        };
        const result = await meterRepo.create(meterDetails, schema);
        if (!result) throw { status: 500, message: 'Something Went Wrong' };
        return METER_RESPONSES.METER_CREATED;
    }

    async updateMeter(id: string, meter: Partial<Meter>, schema: string) {
        const result = await meterRepo.update(meter, { where: { id } }, schema);
        if (!result[0]) throw METER_RESPONSES.METER_UPDATE_FAILED;
        return METER_RESPONSES.METER_UPDATED;
    }

    async deleteMeter(id: string, schema: string, userId: string) {
        const details = {
            isDeleted: true,
            deletedAt: new Date(),
            deletedBy: userId,
        };
        const result = await meterRepo.update(
            details,
            { where: { id } },
            schema,
        );
        if (!result[0]) throw METER_RESPONSES.METER_DELETION_FAILED;
        return METER_RESPONSES.METER_DELETED;
    }
}

export default new MeterService();
