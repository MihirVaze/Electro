import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { Client } from './client.type';
import { ClientSchema } from './client.schema';

class ClientRepo {
    public async create(client: Client, schema: SchemaName) {
        return ClientSchema.schema(schema).create(client);
    }

    public async get(options: FindOptions<Client>, schema: SchemaName) {
        return ClientSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Client>, schema: SchemaName) {
        return ClientSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        client: Partial<Client>,
        options: UpdateOptions<Client>,
        schema: SchemaName,
    ) {
        return ClientSchema.schema(schema).update(client, options);
    }

    public async delete(options: UpdateOptions<Client>, schema: SchemaName) {
        return ClientSchema.schema(schema).update({ isDeleted: true }, options);
    }
}

export default new ClientRepo();
