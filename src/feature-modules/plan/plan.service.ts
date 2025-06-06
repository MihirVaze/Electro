import { SchemaName } from '../../utility/umzug-migration';
import { Op } from 'sequelize';
import planRepo from './plan.repo';
import { PLAN_RESPONSES } from './plan.responses';
import { Plan } from './plan.type';
import { EXCLUDED_KEYS } from '../../utility/base-schema';
import { Payload } from '../auth/auth.type';

class planServices {
    async findOnePlan(plan: Partial<Plan>, schema: SchemaName) {
        try {
            const planRecord = await planRepo.get(
                {
                    where: { id: plan.id, isDeleted: false },
                    attributes: {
                        exclude: EXCLUDED_KEYS,
                    },
                },
                schema,
            );

            if (!planRecord) throw PLAN_RESPONSES.PLAN_NOT_FOUND;

            return planRecord.dataValues;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getPlans(
        limit: number,
        page: number,
        plan: Partial<Plan>,
        schema: SchemaName,
    ) {
        try {
            let where: any = {};

            const {
                minCustomers,
                maxCustomers,
                minPrice,
                maxPrice,
                basePrice,
                ...remainingPlan
            } = plan;

            if (maxCustomers) {
                where.customers = { [Op.lte]: maxCustomers };
            }

            if (minCustomers) {
                where.customers = { [Op.gte]: minCustomers };
            }

            if (maxPrice) {
                where.price = { [Op.lte]: maxPrice };
            }

            if (minPrice) {
                where.price = { [Op.gte]: minPrice };
            }

            if (basePrice) {
                where.price = { [Op.eq]: basePrice };
            }

            where = { ...remainingPlan, ...where };

            const offset = (page - 1) * limit;

            const result = await planRepo.getAll(
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

    async createPlan(plan: Plan, schema: SchemaName) {
        try {
            const result = await planRepo.create(plan, schema);
            return PLAN_RESPONSES.PLAN_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updatePlan(id: string, plan: Partial<Plan>, schema: SchemaName) {
        try {
            if (!id) throw 'ID NOT FOUND';
            const result = await planRepo.update(
                plan,
                {
                    where: { id },
                },
                schema,
            );
            if (!result[0]) throw PLAN_RESPONSES.PLAN_UPDATION_FAILED;
            return PLAN_RESPONSES.PLAN_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteplan(id: string, payload: Payload) {
        try {
            const { id: userId, schema } = payload;
            const result = await planRepo.delete(
                userId,
                { where: { id } },
                schema,
            );
            if (!result[0]) throw PLAN_RESPONSES.PLAN_DELETION_FAILED;
            return PLAN_RESPONSES.PLAN_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getBasePrice(customerCount: number, schema: SchemaName) {
        const plan = await planRepo.get(
            {
                where: {
                    minCustomers: { [Op.lte]: customerCount },
                    maxCustomers: { [Op.gte]: customerCount },
                },
            },
            schema,
        );
        if (!plan) throw PLAN_RESPONSES.PLAN_NOT_FOUND;
        return plan.dataValues;
    }
}

export default new planServices();
