import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { Discount } from './discount.type';
import { DiscountSchema } from './discount.schema';

class DiscountRepo {
    public async create(discount: Discount, schema: SchemaName) {
        return DiscountSchema.schema(schema).create(discount);
    }

    public async get(options: FindOptions<Discount>, schema: SchemaName) {
        return DiscountSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Discount>, schema: SchemaName) {
        return DiscountSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        user: Partial<Discount>,
        options: UpdateOptions<Discount>,
        schema: SchemaName,
    ) {
        return DiscountSchema.schema(schema).update(user, options);
    }

    public async delete(options: UpdateOptions<Discount>, schema: SchemaName) {
        return DiscountSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new DiscountRepo();
