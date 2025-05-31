import { SchemaName } from '../../utility/umzug-migration';

import userService from '../user/user.service';
import { Op } from 'sequelize';
import { UserSchema } from '../user/user.schema';
import roleServices from '../role/role.services';
import { Customer, CustomerWorker, CustomerMeter } from './customer.type';
import { CUSTOMER_RESPONSES } from './customer.responses';
import customerRepo from './customer.repo';
import workerService from '../worker/worker.service';
import { MeterSchema } from '../meter/meter.schema';

class CustomerServices {
    async addCustomer(customer: Customer, schema: SchemaName) {
        try {
            const { name, phoneNo, email, password, cityId, address } =
                customer;
            if (!name || !phoneNo || !email || !password || !cityId || !address)
                throw CUSTOMER_RESPONSES.CUSTOMER_CREATION_FIELDS_MISSING;

            const roleId = (
                await roleServices.getRole({ role: 'customer' }, schema)
            ).id!;
            console.log(roleId);

            const createdUser = await userService.onBoardUser(
                {
                    name,
                    phoneNo,
                    email,
                    password,
                },
                [
                    {
                        roleId,
                        locationIds: [cityId],
                    },
                ],
                schema,
            );

            const { id } = createdUser.result;
            if (!id) throw CUSTOMER_RESPONSES.CUSTOMER_CREATION_FAILED;

            await customerRepo.create(
                {
                    userId: id,
                    cityId,
                    address,
                },
                schema,
            );

            const limit = 10;
            const page = 1;

            const workers = await workerService.getWorkers(
                { cityId },
                limit,
                page,
                'public',
            );

            if (workers.rows.length === 0)
                throw CUSTOMER_RESPONSES.NO_WORKER_AVAILABLE_IN_THIS_AREA;

            const randomNum = Math.random() * workers.count;
            const workerToBeAssigned = workers.rows[randomNum];

            const workerId = workerToBeAssigned.dataValues.userId!;

            await this.addCustomerWorker({ workerId, customerId: id }, schema);

            return CUSTOMER_RESPONSES.CUSTOMER_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getCustomer(customer: Partial<Customer>, schema: SchemaName) {
        try {
            const result = await customerRepo.get(
                {
                    where: customer,
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                },
                schema,
            );
            if (!result) throw CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;

            return result;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getCustomers(
        customer: Partial<Customer>,
        limit: number,
        page: number,
        schema: SchemaName,
    ) {
        try {
            let where: any = {};

            const { email, name, ...remainingCustomer } = customer;

            if (email) {
                where.email = { [Op.iLike]: `%${email}%` };
            }

            if (name) {
                where.name = { [Op.iLike]: `%${name}%` };
            }

            const offset = (page - 1) * limit;

            const result = await customerRepo.getAll(
                {
                    where: { isDeleted: false, ...remainingCustomer },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                    include: [
                        {
                            model: UserSchema,
                            where,
                            attributes: ['name', 'email'],
                        },
                    ],
                    limit,
                    offset,
                },
                schema,
            );

            return result;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async updateCustomer(
        customer: Partial<Customer>,
        customerId: string,
        schema: SchemaName,
    ) {
        try {
            const { name, phoneNo, email, ...restOfCustomer } = customer;
            if (name || phoneNo || email) {
                const CustomerToBeUpdated = await customerRepo.get(
                    {
                        where: { id: customerId },
                    },
                    schema,
                );

                const updateUser: any = {};
                if (phoneNo) {
                    updateUser.phoneNo = phoneNo;
                }
                if (email) {
                    updateUser.email = email;
                }

                updateUser.id = CustomerToBeUpdated?.dataValues.id;

                await userService.updateUser(updateUser, schema);
            }

            const result = await customerRepo.update(
                restOfCustomer,
                {
                    where: { id: customerId },
                },
                schema,
            );
            if (!result) throw CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;

            return CUSTOMER_RESPONSES.CUSTOMER_UPDATED;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteCustomer(customerId: string, schema: SchemaName) {
        try {
            const result = await customerRepo.delete(
                { where: { userId: customerId } },
                schema,
            );
            if (!result) throw CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;
            return CUSTOMER_RESPONSES.CUSTOMER_DELETED;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    //CustomerMeter
    async addCustomerMeter(customerMeter: CustomerMeter, schema: SchemaName) {
        try {
            const result = await customerRepo.createCustomerMeter(
                customerMeter,
                schema,
            );
            if (!result)
                throw CUSTOMER_RESPONSES.CUSTOMER_METER_CREATION_FAILED;

            return CUSTOMER_RESPONSES.CUSTOMER_METER_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getCustomerMeter(
        customerMeter: Partial<CustomerMeter>,
        schema: SchemaName,
    ) {
        try {
            const result = await customerRepo.getCustomerMeter(
                {
                    where: customerMeter,
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                    include: [
                        {
                            model: UserSchema,
                            attributes: ['name', 'email'],
                        },
                        {
                            model: MeterSchema,
                            attributes: [
                                'name',
                                'image',
                                'basePrice',
                                'pricePerUnit',
                            ],
                        },
                    ],
                },
                schema,
            );

            if (!result) throw CUSTOMER_RESPONSES.CUSTOMER_METER_NOT_FOUND;
            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getCustomerMeters(
        customerMeter: Partial<CustomerMeter>,
        limit: number,
        page: number,
        schema: SchemaName,
    ) {
        try {
            let whereUser: any = {};
            let whereMeter: any = {};

            const { email, name, meterName, ...remainingCustomerMeter } =
                customerMeter;

            if (email) {
                whereUser.email = { [Op.iLike]: `%${email}%` };
            }

            if (name) {
                whereUser.name = { [Op.iLike]: `%${name}%` };
            }

            if (meterName) {
                whereMeter.name = { [Op.iLike]: `%${name}%` };
            }

            const offset = (page - 1) * limit;

            const result = await customerRepo.getAllCustomerMeter(
                {
                    where: { isDeleted: false, ...remainingCustomerMeter },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                    include: [
                        {
                            model: UserSchema,
                            where: whereUser,
                            attributes: ['name', 'email'],
                        },
                        {
                            model: MeterSchema,
                            where: whereMeter,
                            attributes: [
                                'name',
                                'image',
                                'basePrice',
                                'pricePerUnit',
                            ],
                        },
                    ],
                    limit,
                    offset,
                },
                schema,
            );

            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteCustomerMeter(customerMeterId: string, schema: SchemaName) {
        try {
            const result = await customerRepo.deleteCustomerMeter(
                { where: { id: customerMeterId } },
                schema,
            );
            if (!result) throw CUSTOMER_RESPONSES.CUSTOMER_METER_NOT_FOUND;
            return CUSTOMER_RESPONSES.CUSTOMER_METER_DELETED;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getCustomerWorker(
        customerWorker: Partial<CustomerWorker>,
        schema: SchemaName,
    ) {
        try {
            const result = await customerRepo.getCustomerWorker(
                { where: customerWorker },
                schema,
            );
            if (!result) throw CUSTOMER_RESPONSES.CUSTOMER_WORKER_NOT_FOUND;

            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getCustomerWorkers(
        customerWorker: Partial<CustomerWorker>,
        limit: number,
        page: number,
        schema: SchemaName,
    ) {
        try {
            const offset = (page - 1) * limit;

            const result = await customerRepo.getAll(
                {
                    where: { isDeleted: false, ...customerWorker },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                    include: [
                        {
                            model: UserSchema,
                            attributes: ['name', 'email'],
                        },
                    ],
                    limit,
                    offset,
                },
                schema,
            );
            if (!result) throw CUSTOMER_RESPONSES.CUSTOMER_WORKER_NOT_FOUND;

            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async addCustomerWorker(
        customerWorker: CustomerWorker,
        schema: SchemaName,
    ) {
        try {
            const result = await customerRepo.createCustomerWorker(
                customerWorker,
                schema,
            );
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default new CustomerServices();
