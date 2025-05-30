import { SchemaName } from '../../utility/umzug-migration';

import userService from '../user/user.service';
import { Op } from 'sequelize';
import { UserSchema } from '../user/user.schema';
import { runMigration } from '../../utility/umzug-migration';
import roleServices from '../role/role.services';
import { Customer, CustomerMeter } from './customer.type';
import { CUSTOMER_RESPONSES } from './customer.responses';
import customerRepo from './customer.repo';
import { MeterSchema } from '../meter/meter.schema';

class CustomerServices {
    async addCustomer(Customer: Customer, schema: SchemaName) {
        try {
            const { name, phoneNo, email, password, cityId, address } =
                Customer;
            if (!name || !phoneNo || !email || !password || !cityId || !address)
                throw CUSTOMER_RESPONSES.CUSTOMER_CREATION_FIELDS_MISSING;

            const createdUser = await userService.onBoardUser(
                {
                    name,
                    phoneNo,
                    email,
                    password,
                },
                [{ roleId: '' }], //SKIPPED FOR NOW
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

            return CUSTOMER_RESPONSES.CUSTOMER_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getCustomer(Customer: Partial<Customer>, schema: SchemaName) {
        try {
            const result = await customerRepo.get(
                {
                    where: Customer,
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
}

export default new CustomerServices();
