import {
    runMigrationAndSeeders,
    SchemaName,
} from '../../utility/umzug-migration';
import clientRepo from './client.repo';
import { Client } from './client.type';
import userService from '../user/user.service';
import { CLIENT_RESPONSES } from './client.responses';
import { Op } from 'sequelize';
import { UserSchema } from '../user/user.schema';
import { ROLE } from '../role/role.data';
import discountService from '../discount/discount.service';

class ClientServices {
    async addClient(client: Client, schema: SchemaName) {
        try {
            const { clientName, phoneNo, email, schemaName } = client;

            const createdUser = await userService.onBoardUser(
                {
                    name: clientName,
                    phoneNo,
                    email,
                    password: '',
                    createdBy: client.createdBy,
                },
                [{ roleId: ROLE.CLIENT_ADMIN }],
                schema,
            );

            const { id } = createdUser.result;
            if (!id) throw CLIENT_RESPONSES.CLIENT_CREATION_FAILED;

            await clientRepo.create(
                {
                    clientName,
                    userId: id,
                    schemaName,
                },
                schema,
            );

            await runMigrationAndSeeders(
                client.schemaName,
                'migrations/common/*js',
                'migration',
            );
            await runMigrationAndSeeders(
                client.schemaName,
                'migrations/client/*js',
                'migration',
            );
            await runMigrationAndSeeders(
                client.schemaName,
                'seeders/common/*js',
                'seeder',
            );

            await discountService.createDiscount(
                {
                    clientId: id,
                    createdBy: id,
                    type: 'none',
                    value: 0,
                },
                schema,
            );

            return CLIENT_RESPONSES.CLIENT_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getClient(client: Partial<Client>, schema: SchemaName) {
        try {
            const result = await clientRepo.get(
                {
                    where: client,
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
                            attributes: ['name', 'email', 'phoneNo'],
                        },
                    ],
                },
                schema,
            );
            if (!result) throw CLIENT_RESPONSES.CLIENT_NOT_FOUND;

            return result;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getClients(
        client: Partial<Client>,
        limit: number,
        page: number,
        schema: SchemaName,
    ) {
        try {
            let where: any = {};

            let clientWhere: any = {};

            const { email, clientName } = client;

            if (email) {
                where.email = { [Op.iLike]: `%${email}%` };
            }

            if (clientName) {
                clientWhere.clientName = { [Op.iLike]: `%${clientName}%` };
            }

            const offset = (page - 1) * limit;

            const result = await clientRepo.getAll(
                {
                    where: { isDeleted: false, ...clientWhere },
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

    async getAllClients() {
        try {
            const result = await clientRepo.getAll({}, 'public');
            const clients = result.rows;
            return clients;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async updateClient(
        client: Partial<Client>,
        userId: string,
        schema: SchemaName,
    ) {
        try {
            const { phoneNo, email, clientName, ...remainingClient } = client;
            if (phoneNo || email || clientName) {
                const updateUser: any = {};
                if (phoneNo) {
                    updateUser.phoneNo = phoneNo;
                }
                if (email) {
                    updateUser.email = email;
                }
                if (clientName) {
                    updateUser.name = clientName;
                }

                updateUser.id = userId;

                await userService.updateUser(
                    { ...updateUser, updatedBy: client.updatedBy },
                    schema,
                );
            }

            const result = await clientRepo.update(
                { clientName, ...remainingClient },
                {
                    where: { userId },
                },
                schema,
            );
            if (!result[0]) throw CLIENT_RESPONSES.CLIENT_NOT_FOUND;

            return CLIENT_RESPONSES.CLIENT_UPDATED;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteClient(client: Partial<Client>, schema: SchemaName) {
        try {
            const { userId, deletedBy } = client;
            if (!userId) throw CLIENT_RESPONSES.CLIENT_DELETION_FAILED;

            const deletedClient = await clientRepo.delete(
                { deletedBy, deletedAt: new Date() },
                { where: { userId } },
                schema,
            );

            const deletedUser = await userService.deleteUser(userId, schema);

            if (!deletedClient || !deletedUser)
                throw CLIENT_RESPONSES.CLIENT_NOT_FOUND;
            return CLIENT_RESPONSES.CLIENT_DELETED;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default new ClientServices();
