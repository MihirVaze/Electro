import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { Customer, CustomerWorker } from './customer.type';
import { CustomerSchema, CustomerWorkerSchema } from './customer.schema';

class CustomerRepo {
    public async create(customer: Customer, schema: SchemaName) {
        return CustomerSchema.schema(schema).create(customer);
    }

    public async get(options: FindOptions<Customer>, schema: SchemaName) {
        return CustomerSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Customer>, schema: SchemaName) {
        return CustomerSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        customer: Partial<Customer>,
        options: UpdateOptions<Customer>,
        schema: SchemaName,
    ) {
        return CustomerSchema.schema(schema).update(customer, options);
    }

    public async delete(options: UpdateOptions<Customer>, schema: SchemaName) {
        return CustomerSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }

    //Customer Worker

    public async createCustomerWorker(
        customerWorker: CustomerWorker,
        schema: SchemaName,
    ) {
        return CustomerWorkerSchema.schema(schema).create(customerWorker);
    }

    public async getCustomerWorker(
        options: FindOptions<CustomerWorker>,
        schema: SchemaName,
    ) {
        return CustomerWorkerSchema.schema(schema).findOne(options);
    }

    public async getAllCustomerWorker(
        options: FindOptions<CustomerWorker>,
        schema: SchemaName,
    ) {
        return CustomerWorkerSchema.schema(schema).findAndCountAll(options);
    }

    public async updateCustomerWorker(
        customerWorker: Partial<CustomerWorker>,
        options: UpdateOptions<CustomerWorker>,
        schema: SchemaName,
    ) {
        return CustomerWorkerSchema.schema(schema).update(
            customerWorker,
            options,
        );
    }

    public async deleteCustomerWorker(
        options: UpdateOptions<CustomerWorker>,
        schema: SchemaName,
    ) {
        return CustomerWorkerSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new CustomerRepo();
