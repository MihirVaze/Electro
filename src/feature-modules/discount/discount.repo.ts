import { FindOptions, UpdateOptions } from 'sequelize';
import { Discount } from './discount.type';
import { DiscountSchema } from './discount.schema';

class DiscountRepo {
    public async create(discount: Discount, schema: string) {
        return DiscountSchema.schema(schema).create(discount);
    }

    public async get(options: FindOptions<Discount>, schema: string) {
        return DiscountSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Discount>, schema: string) {
        return DiscountSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        discount: Partial<Discount>,
        options: UpdateOptions<Discount>,
        schema: string,
    ) {
        return DiscountSchema.schema(schema).update(discount, options);
    }

    public async delete(options: UpdateOptions<Discount>, schema: string) {
        return DiscountSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new DiscountRepo();
