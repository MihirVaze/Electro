import { SchemaName } from '../../utility/umzug-migration';
import { CreateOptions, FindOptions, UpdateOptions } from 'sequelize';
import {
    Customer,
    CustomerWorker,
    CustomerMeter,
    CreateCustomer,
    UpdateCustomer,
} from './customer.type';
import {
    CustomerMeterSchema,
    CustomerSchema,
    CustomerWorkerSchema,
} from './customer.schema';

class CustomerRepo {
    public async create(
        customer: CreateCustomer,
        options: CreateOptions<CreateCustomer>,
        schema: SchemaName,
    ) {
        return CustomerSchema.schema(schema).create(customer, options);
    }

    public async get(options: FindOptions<Customer>, schema: SchemaName) {
        return CustomerSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Customer>, schema: SchemaName) {
        return CustomerSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        customer: Partial<UpdateCustomer>,
        options: UpdateOptions<CreateCustomer>,
        schema: SchemaName,
    ) {
        return CustomerSchema.schema(schema).update(customer, options);
    }

    public async delete(
        options: UpdateOptions<CreateCustomer>,
        schema: SchemaName,
    ) {
        return CustomerSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }

    //Customer Worker

    public async createCustomerWorker(
        customerWorker: CustomerWorker,
        options: CreateOptions<CustomerWorker>,
        schema: SchemaName,
    ) {
        return CustomerWorkerSchema.schema(schema).create(
            customerWorker,
            options,
        );
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

    //CustomerMeter
    public async createCustomerMeter(
        customerMeter: CustomerMeter,
        options: CreateOptions<CustomerMeter>,
        schema: SchemaName,
    ) {
        return CustomerMeterSchema.schema(schema).create(
            customerMeter,
            options,
        );
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
