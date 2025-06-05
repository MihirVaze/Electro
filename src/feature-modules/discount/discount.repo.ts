import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { CreateDiscount, Discount } from './discount.type';
import { DiscountSchema } from './discount.schema';

class DiscountRepo {
    public async create(discount: CreateDiscount, schema: SchemaName) {
        return DiscountSchema.schema(schema).create(discount);
    }

    public async get(options: FindOptions<Discount>, schema: SchemaName) {
        return DiscountSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Discount>, schema: SchemaName) {
        return DiscountSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        discount: Partial<Discount>,
        options: UpdateOptions<Discount>,
        schema: SchemaName,
    ) {
        return DiscountSchema.schema(schema).update(discount, options);
    }

    public async delete(
        userId: string,
        options: UpdateOptions<Discount>,
        schema: SchemaName,
    ) {
        return DiscountSchema.schema(schema).update(
            { isDeleted: true, deletedBy: userId },
            options,
        );
    }
}

export default new DiscountRepo();
