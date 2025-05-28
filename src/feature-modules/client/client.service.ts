import { SchemaName } from '../../utility/umzug-migration';
import clientRepo from './client.repo';
import { Client } from './client.type';
import userService from '../user/user.service';
import { CLIENT_RESPONSES } from './client.responses';
import { Op } from 'sequelize';
import { UserSchema } from '../user/user.schema';
import { runMigration } from '../../utility/umzug-migration';

class ClientServices {
    async addClient(client: Client, schema: SchemaName) {
        try {
            const { clientName, phoneNo, email, password, schemaName } = client;
            if (!phoneNo || !email || !password)
                throw CLIENT_RESPONSES.CLIENT_CREATION_FAILED;

            const createdUser = await userService.createUser(
                {
                    name: clientName,
                    phoneNo,
                    email,
                    password,
                },
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

            await runMigration(client.schemaName, 'migrations/common/*js');

            await runMigration(client.schemaName, 'seeders/*js');

            return CLIENT_RESPONSES.CLIENT_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getClient(client: Partial<Client>, schema: SchemaName) {
        try {
            const result = await clientRepo.get({ where: client }, schema);
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

            const result = await clientRepo.getAll(
                {
                    where: { isDeleted: false, ...clientWhere },
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

                await userService.update(updateUser, schema);
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
}

export default new ClientServices();
