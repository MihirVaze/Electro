import { SchemaName } from '../../utility/umzug-migration';

import userService from '../user/user.service';
import { Op } from 'sequelize';
import { UserSchema } from '../user/user.schema';
import { runMigration } from '../../utility/umzug-migration';
import roleServices from '../role/role.services';
import { Customer } from './customer.type';
import { CUSTOMER_RESPONSES } from './customer.responses';
import customerRepo from './customer.repo';

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
            const result = await customerRepo.get({ where: Customer }, schema);
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

                await userService.update(updateUser, schema);
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
}

export default new CustomerServices();
