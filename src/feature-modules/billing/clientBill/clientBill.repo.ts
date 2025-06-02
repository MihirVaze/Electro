import { FindOptions, UpdateOptions } from 'sequelize';
import { SchemaName } from '../../../utility/umzug-migration';
import {
    ClientBill,
    CreateClientBill,
    UpdateClientBill,
} from './clientBill.types';
import { ClientBillSchema } from './clientBill.schema';

class ClientBillRepo {
    public async getAll(
        clientBill: FindOptions<ClientBill>,
        schema: SchemaName,
    ) {
        return ClientBillSchema.schema(schema).findAndCountAll(clientBill);
    }

    public async getOne(
        clientBill: FindOptions<ClientBill>,
        schema: SchemaName,
    ) {
        return ClientBillSchema.schema(schema).findOne(clientBill);
    }

    public async create(clientBill: CreateClientBill[], schema: SchemaName) {
        return ClientBillSchema.schema(schema).bulkCreate(clientBill);
    }

    public async update(
        clientBill: Partial<UpdateClientBill>,
        options: UpdateOptions<CreateClientBill>,
        schema: SchemaName,
    ) {
        return ClientBillSchema.schema(schema).update(clientBill, options);
    }

    public async delete(
        options: UpdateOptions<CreateClientBill>,
        schema: SchemaName,
    ) {
        return ClientBillSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new ClientBillRepo();
