import clientRepo from "./client.repo";
import { Client } from "./client.type";
import userService from "../user/user.service";
import { CLIENT_RESPONSES } from "./client.responses";
import { Op } from "sequelize";
import { UserSchema } from "../user/user.schema";

class ClientServices {

    async addClient(client: Client) {
        try {

            const { clientName, phoneNo, email, password, schemaName } = client;
            if (!phoneNo || !email || !password) throw CLIENT_RESPONSES.CLIENT_CREATION_FAILED;

            const createdUser = await userService.createUser({ name: clientName, phoneNo, email, password });

            const { id } = createdUser.result.dataValues;
            if (!id) throw CLIENT_RESPONSES.CLIENT_CREATION_FAILED;

            await clientRepo.create({
                clientName, userId: id, schemaName
            });

            return CLIENT_RESPONSES.CLIENT_CREATED;

        } catch (error) {
            console.dir(error);
            throw error;
        }
    }


    async getClient(client: Partial<Client>) {
        try {

            const result = await clientRepo.get({ where: client });
            if (!result) throw CLIENT_RESPONSES.CLIENT_NOT_FOUND;

            return result;

        } catch (error) {
            console.dir(error)
            throw error
        }
    }

    async getClients(client: Partial<Client>, limit: number, page: number) {
        try {

            let where: any = {};

            let clientWhere: any = {};

            const { email, clientName, ...remainingClient } = client;

            if (email) {
                where.email = { [Op.iLike]: `%${email}%` };
            }

            if (clientName) {
                clientWhere.clientName = { [Op.iLike]: `%${clientName}%` }
            }

            const offset = (page - 1) * limit;

            const result = await clientRepo.getAll({
                where: { isDeleted: false, ...clientWhere },
                include: [
                    {
                        model: UserSchema,
                        where,
                        attributes: ['name', 'email',]
                    }
                ],
                limit,
                offset
            });

            return result;

        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async updateClient(client: Partial<Client>, clientId: string) {
        try {

            if (client.clientName || client.email) {

                const clientToBeUpdated = await clientRepo.get({ where: { id: clientId } });

                const updateUser: any = {};
                if (client.clientName) {
                    updateUser.name = client.clientName;
                }
                if (client.email) {
                    updateUser.email = client.email;
                }

                updateUser.id = clientToBeUpdated?.dataValues.id;

                await userService.update(updateUser);

            }

            const result = await clientRepo.update(client, { where: { id: clientId } });
            if (!result) throw CLIENT_RESPONSES.CLIENT_NOT_FOUND;

            return CLIENT_RESPONSES.CLIENT_UPDATED;

        } catch (e) {
            console.log(e);
            throw e;
        }
    }


}

export default new ClientServices();