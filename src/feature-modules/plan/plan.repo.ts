import { FindOptions, UpdateOptions } from 'sequelize';
import { Plan } from './plan.type';
import { PlanSchema } from './plan.schema';

class PlanRepo {
    public async create(plan: Plan) {
        return PlanSchema.create(plan);
    }

    public async get(options: FindOptions<Plan>) {
        return PlanSchema.findOne(options);
    }

    public async getAll(options: FindOptions<Plan>) {
        return PlanSchema.findAndCountAll(options);
    }

    public async update(user: Partial<Plan>, options: UpdateOptions<Plan>) {
        return PlanSchema.update(user, options);
    }

    public async delete(options: UpdateOptions<Plan>) {
        return PlanSchema.update({ isDeleted: true }, options);
    }
}

export default new PlanRepo();
