import { FindOptions, UpdateOptions } from 'sequelize';
import { CustomerBillSchema } from './customerBill.schema';
import { CustomerBill } from './customerBill.type';
import { SchemaName } from '../../../utility/umzug-migration';

class CustomerBillRepo {
    public async getAll(
        details: FindOptions<CustomerBill>,
        schema: SchemaName,
    ) {
        return CustomerBillSchema.schema(schema).findAndCountAll(details);
    }

    public async getOne(
        details: FindOptions<CustomerBill>,
        schema: SchemaName,
    ) {
        return CustomerBillSchema.schema(schema).findOne(details);
    }

    public async create(billDetails: CustomerBill[], schema: SchemaName) {
        return CustomerBillSchema.schema(schema).bulkCreate(billDetails);
    }

    public async update(
        customerBill: Partial<CustomerBill>,
        options: UpdateOptions<CustomerBill>,
        schema: SchemaName,
    ) {
        return CustomerBillSchema.schema(schema).update(customerBill, options);
    }

    public async delete(
        customerBill: Partial<CustomerBill>,
        options: UpdateOptions<CustomerBill>,
        schema: SchemaName,
    ) {
        const { deletedAt, deletedBy } = customerBill;
        return CustomerBillSchema.schema(schema).update(
            { deletedAt, deletedBy, isDeleted: true },
            options,
        );
    }
}

export default new CustomerBillRepo();
