import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { Plan } from './plan.type';
import { PlanSchema } from './plan.schema';

class PlanRepo {
    public async create(plan: Plan, schema: SchemaName) {
        return PlanSchema.schema(schema).create(plan);
    }

    public async get(options: FindOptions<Plan>, schema: SchemaName) {
        return PlanSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Plan>, schema: SchemaName) {
        return PlanSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        plan: Partial<Plan>,
        options: UpdateOptions<Plan>,
        schema: SchemaName,
    ) {
        return PlanSchema.schema(schema).update(plan, options);
    }

    public async delete(
        userId: string,
        options: UpdateOptions<Plan>,
        schema: SchemaName,
    ) {
        return PlanSchema.schema(schema).update(
            { isDeleted: true, deletedBy: userId },
            options,
        );
    }
}

export default new PlanRepo();
