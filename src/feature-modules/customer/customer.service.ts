import { SchemaName } from '../../utility/umzug-migration';

import userService from '../user/user.service';
import { Op, Transaction } from 'sequelize';
import { UserSchema } from '../user/user.schema';
import {
    Customer,
    CustomerWorker,
    CustomerMeter,
    RegisterCustomer,
} from './customer.type';
import { CUSTOMER_RESPONSES } from './customer.responses';
import customerRepo from './customer.repo';
import { MeterSchema } from '../meter/meter.schema';
import { ROLE } from '../role/role.data';
import { sequelize } from '../../connections/pg.connection';
import workerService from '../worker/worker.service';

class CustomerServices {
    async addCustomer(customer: RegisterCustomer, schema: SchemaName) {
        const transaction = await sequelize.transaction();
        try {
            const { name, phoneNo, email, cityId, address } = customer;

            const createdUser = await userService.onBoardUser(
                {
                    name,
                    phoneNo,
                    email,
                    password: '',
                },
                [
                    {
                        roleId: ROLE.CUSTOMER,
                        locationIds: [cityId],
                    },
                ],
                schema,
            );

            const { id } = createdUser.result;
            if (!id) throw CUSTOMER_RESPONSES.CUSTOMER_CREATION_FAILED;

            await customerRepo.createCustomer(
                {
                    userId: id,
                    cityId,
                    address,
                },
                { transaction },
                schema,
            );

            transaction.commit();
            return CUSTOMER_RESPONSES.CUSTOMER_CREATED;
        } catch (error) {
            transaction.rollback();
            console.dir(error);
            throw error;
        }
    }

    async getCustomer(customer: Partial<Customer>, schema: SchemaName) {
        try {
            const result = await customerRepo.getCustomer(
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
                    include: [
                        {
                            model: UserSchema.schema(schema),
                            as: 'user',
                            attributes: ['name', 'email', 'phoneNo'],
                        },
                    ],
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
            let userWhere: any = {};
            let customerWhere: any = {};

            const { email, name, address, ...remainingCustomer } = customer;

            if (email) {
                userWhere.email = { [Op.iLike]: `%${email}%` };
            }

            if (name) {
                userWhere.name = { [Op.iLike]: `%${name}%` };
            }

            if (address) {
                customerWhere.address = { [Op.iLike]: `%${address}%` };
            }

            const offset = (page - 1) * limit;

            const result = await customerRepo.getAllCustomers(
                {
                    where: {
                        isDeleted: false,
                        ...customerWhere,
                        ...remainingCustomer,
                    },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                    include: [
                        {
                            model: UserSchema.schema(schema),
                            where: userWhere,
                            as: 'user',
                            attributes: ['name', 'email', 'phoneNo'],
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

    async getCustomerCount(schema: SchemaName) {
        try {
            const result = await customerRepo.getAllCustomers({}, schema);
            const countOfCustomer = result.count;
            return countOfCustomer;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async updateCustomer(
        customer: Partial<Customer>,
        userId: string,
        schema: SchemaName,
    ) {
        try {
            const { name, phoneNo, email, ...restOfCustomer } = customer;
            if (name || phoneNo || email) {
                const updateUser: any = {};
                if (phoneNo) {
                    updateUser.phoneNo = phoneNo;
                }
                if (email) {
                    updateUser.email = email;
                }
                if (name) {
                    updateUser.name = name;
                }

                updateUser.id = userId;

                await userService.updateUser(updateUser, schema);
            }

            const result = await customerRepo.updateCustomer(
                restOfCustomer,
                {
                    where: { userId },
                },
                schema,
            );
            if (!result[0]) throw CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;

            return CUSTOMER_RESPONSES.CUSTOMER_UPDATED;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteCustomer(customer: Partial<Customer>, schema: SchemaName) {
        try {
            const { userId, deletedBy } = customer;
            const result = await customerRepo.deleteCustomer(
                { deletedBy, deletedAt: new Date() },
                { where: { userId } },
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
        const transaction = await sequelize.transaction();
        try {
            const result = await customerRepo.createCustomerMeter(
                customerMeter,
                { transaction },
                schema,
            );

            const customer = await this.getCustomer(
                { userId: customerMeter.userId },
                schema,
            );
            const { cityId, userId } = customer.dataValues;

            const limit = 1;
<<<<<<< HEAD
            const workers =
                await workerService.getAllWorkersSortedByCustomerCount(
                    { cityId },
                    limit,
                    'public',
                );
=======
            const workers = await workerService.getWorkersSortedByCustomerCount(
                { cityId },
                limit,
                'public',
            );
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39

            if (!workers.count)
                throw CUSTOMER_RESPONSES.NO_WORKER_AVAILABLE_IN_THIS_AREA;
            const workerToBeAssigned = workers.rows[0];

            const { customerCount, userId: workerId } =
                workerToBeAssigned.dataValues;
            if (!(typeof customerCount === 'number') || !workerId)
                throw CUSTOMER_RESPONSES.CUSTOMER_METER_CREATION_FIELDS_MISSING;

            await this.addCustomerWorker(
                { userId, workerId },
                schema,
                transaction,
            );

            const updatedCount = customerCount + 1;
            await workerService.updateWorker(
                { customerCount: updatedCount },
                workerId,
                'public',
                transaction,
            );

            transaction.commit();
            return CUSTOMER_RESPONSES.CUSTOMER_METER_CREATED;
        } catch (e) {
            transaction.rollback();
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
                            model: UserSchema.schema(schema),
                            attributes: ['name', 'email'],
                        },
                        {
                            model: MeterSchema.schema(schema),
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
                            model: UserSchema.schema(schema),
                            where: whereUser,
                            attributes: ['name', 'email'],
                        },
                        {
                            model: MeterSchema.schema(schema),
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

    //CUSTOMER-WORKER
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

            const result = await customerRepo.getAllCustomers(
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
                            model: UserSchema.schema(schema),
                            as: 'customer',
                            attributes: ['name', 'email'],
                        },
                        {
                            model: UserSchema.schema('public'),
                            as: 'worker',
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
        transaction: Transaction,
    ) {
        try {
            await customerRepo.createCustomerWorker(
                customerWorker,
                { transaction },
                schema,
            );
            transaction.commit();
            return CUSTOMER_RESPONSES.WORKER_ASSIGNED_TO_CUSTOMER;
        } catch (e) {
            transaction.rollback();
            console.log(e);
            throw e;
        }
    }
}

export default new CustomerServices();
