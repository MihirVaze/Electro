import { FindOptions, UpdateOptions } from "sequelize";
import { Client } from "./client.type";
import { ClientSchema } from "./client.schema";

class ClientRepo {

    public async create(client: Client) {
        return ClientSchema.create(client);
    }

    public async get(options: FindOptions<Client>) {
        return ClientSchema.findOne(options);
    }

    public async getAll(options: FindOptions<Client>) {
        return ClientSchema.findAndCountAll(options);
    }

    public async update(client: Partial<Client>, options: UpdateOptions<Client>) {
        return ClientSchema.update(client, options);
    }

    public async delete(options: UpdateOptions<Client>) {
        return ClientSchema.update({ isDeleted: true }, options);
    }
}

export default new ClientRepo()