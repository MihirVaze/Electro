import { SchemaName } from '../../utility/umzug-migration';
import { Op } from 'sequelize';
import { Discount } from './discount.type';
import discountRepo from './discount.repo';
import { DISCOUNT_RESPONSES } from './discount.responses';
import { EXCLUDED_KEYS } from '../../utility/base-schema';
import { Payload } from '../auth/auth.type';

class DiscountServices {
    async findOneDiscount(discount: Partial<Discount>, schema: SchemaName) {
        try {
            const discountRecord = await discountRepo.get(
                {
                    where: { ...discount, isDeleted: false },
                    attributes: {
                        exclude: EXCLUDED_KEYS,
                    },
                },
                schema,
            );

            if (!discountRecord) throw DISCOUNT_RESPONSES.DISCOUNT_NOT_FOUND;

            return discountRecord.dataValues;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getdiscounts(
        limit: number,
        page: number,
        discount: Partial<Discount>,
        schema: SchemaName,
    ) {
        try {
            let where: any = {};

            const { value, minValue, maxValue } = discount;

            if (maxValue) {
                where.value = { [Op.lte]: maxValue };
            }

            if (minValue) {
                where.value = { [Op.gte]: minValue };
            }

            if (value) {
                where.value = { [Op.eq]: value };
            }

            where = { ...where };

            const offset = (page - 1) * limit;

            const result = await discountRepo.getAll(
                {
                    where: { isDeleted: false, ...where },
                    attributes: {
                        exclude: EXCLUDED_KEYS,
                    },
                    limit,
                    offset,
                },
                schema,
            );

            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async createDiscount(discount: Discount, schema: SchemaName) {
        try {
            await discountRepo.create(discount, schema);
            return DISCOUNT_RESPONSES.DISCOUNT_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateDiscount(
        id: string,
        discount: Partial<Discount>,
        schema: SchemaName,
    ) {
        try {
            if (!id) throw 'ID NOT FOUND';
            const result = await discountRepo.update(
                discount,
                { where: { id } },
                schema,
            );
            if (!result[0]) throw DISCOUNT_RESPONSES.DISCOUNT_DELETION_FAILED;
            return DISCOUNT_RESPONSES.DISCOUNT_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deletediscount(id: string, payload: Payload) {
        try {
            const { id: userId, schema } = payload;
            const result = await discountRepo.delete(
                userId,
                { where: { id } },
                schema,
            );
            if (!result[0]) throw DISCOUNT_RESPONSES.DISCOUNT_DELETION_FAILED;
            return DISCOUNT_RESPONSES.DISCOUNT_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
}

export default new DiscountServices();
