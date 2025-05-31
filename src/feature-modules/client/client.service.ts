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
import roleServices from '../role/role.services';

class ClientServices {
    async addClient(client: Client, schema: SchemaName) {
        try {
            const { clientName, phoneNo, email, schemaName } = client;
            if (!phoneNo || !email)
                throw CLIENT_RESPONSES.CLIENT_CREATION_FIELDS_MISSING;

            const roleId = (
                await roleServices.getRole({ role: 'client_admin' }, schema)
            ).id!;

            const createdUser = await userService.onBoardUser(
                {
                    name: clientName,
                    phoneNo,
                    email,
                    password: '',
                },
                [{ roleId }],
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
                'seeders/*js',
                'seeder',
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

            const { email, clientName, ...remainingClient } = client;

            if (email) {
                where.email = { [Op.iLike]: `%${email}%` };
            }

            if (clientName) {
                clientWhere.clientName = { [Op.iLike]: `%${clientName}%` };
            }

            const offset = (page - 1) * limit;

            clientWhere = { ...clientWhere, remainingClient };

            const result = await clientRepo.getAll(
                {
                    where: { isDeleted: false, ...remainingClient },
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

    async updateClient(
        client: Partial<Client>,
        clientId: string,
        schema: SchemaName,
    ) {
        try {
            const { phoneNo, email, ...restOfClient } = client;
            if (phoneNo || email) {
                const clientToBeUpdated = await clientRepo.get(
                    {
                        where: { id: clientId },
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

                updateUser.id = clientToBeUpdated?.dataValues.id;

                await userService.updateUser(updateUser, schema);
            }

            const result = await clientRepo.update(
                restOfClient,
                {
                    where: { id: clientId },
                },
                schema,
            );
            if (!result) throw CLIENT_RESPONSES.CLIENT_NOT_FOUND;

            return CLIENT_RESPONSES.CLIENT_UPDATED;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteClient(clientId: string, schema: SchemaName) {
        try {
            const result = await clientRepo.delete(
                { where: { userId: clientId } },
                schema,
            );
            if (!result) throw CLIENT_RESPONSES.CLIENT_NOT_FOUND;
            return CLIENT_RESPONSES.CLIENT_DELETED;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default new ClientServices();
