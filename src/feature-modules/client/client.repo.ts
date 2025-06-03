import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { Client, CreateClient, UpdateClient } from './client.type';
import { ClientSchema } from './client.schema';

class ClientRepo {
    public async create(client: CreateClient, schema: SchemaName) {
        return ClientSchema.schema(schema).create(client);
    }

    public async get(options: FindOptions<Client>, schema: SchemaName) {
        return ClientSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Client>, schema: SchemaName) {
        return ClientSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        client: Partial<UpdateClient>,
        options: UpdateOptions<CreateClient>,
        schema: SchemaName,
    ) {
        return ClientSchema.schema(schema).update(client, options);
    }

    public async delete(
        client: Partial<Client>,
        options: UpdateOptions<CreateClient>,
        schema: SchemaName,
    ) {
        const { deletedAt, deletedBy } = client;
        return ClientSchema.schema(schema).update(
            { deletedAt, deletedBy, isDeleted: true },
            options,
        );
    }
}

export default new ClientRepo();
