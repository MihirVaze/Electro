import { FindOptions, UpdateOptions } from 'sequelize';
import { Plan } from './plan.type';
import { PlanSchema } from './plan.schema';

class PlanRepo {
    public async create(plan: Plan, schema: string) {
        return PlanSchema.schema(schema).create(plan);
    }

    public async get(options: FindOptions<Plan>, schema: string) {
        return PlanSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Plan>, schema: string) {
        return PlanSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        user: Partial<Plan>,
        options: UpdateOptions<Plan>,
        schema: string,
    ) {
        return PlanSchema.schema(schema).update(user, options);
    }

    public async delete(options: UpdateOptions<Plan>, schema: string) {
        return PlanSchema.schema(schema).update({ isDeleted: true }, options);
    }
}

export default new PlanRepo();
