import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { Customer, CustomerMeter } from './customer.type';
import { CustomerMeterSchema, CustomerSchema } from './customer.schema';

class CustomerRepo {
    public async create(Customer: Customer, schema: SchemaName) {
        return CustomerSchema.schema(schema).create(Customer);
    }

    public async get(options: FindOptions<Customer>, schema: SchemaName) {
        return CustomerSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Customer>, schema: SchemaName) {
        return CustomerSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        Customer: Partial<Customer>,
        options: UpdateOptions<Customer>,
        schema: SchemaName,
    ) {
        return CustomerSchema.schema(schema).update(Customer, options);
    }

    public async delete(options: UpdateOptions<Customer>, schema: SchemaName) {
        return CustomerSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }

    //CustomerMeter
    public async createCustomerMeter(
        customerMeter: CustomerMeter,
        schema: SchemaName,
    ) {
        return CustomerMeterSchema.schema(schema).create(customerMeter);
    }

    public async getCustomerMeter(
        options: FindOptions<CustomerMeter>,
        schema: SchemaName,
    ) {
        return CustomerMeterSchema.schema(schema).findOne(options);
    }

    public async getAllCustomerMeter(
        options: FindOptions<CustomerMeter>,
        schema: SchemaName,
    ) {
        return CustomerMeterSchema.schema(schema).findAndCountAll(options);
    }

    public async updateCustomerMeter(
        customerMeter: Partial<CustomerMeter>,
        options: UpdateOptions<CustomerMeter>,
        schema: SchemaName,
    ) {
        return CustomerMeterSchema.schema(schema).update(
            customerMeter,
            options,
        );
    }

    public async deleteCustomerMeter(
        options: UpdateOptions<CustomerMeter>,
        schema: SchemaName,
    ) {
        return CustomerMeterSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new CustomerRepo();
