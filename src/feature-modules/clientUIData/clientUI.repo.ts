import { FindOptions, UpdateOptions } from 'sequelize';
import { ClientUIData } from './clientUIData.type';
import { ClientUISchema } from './clientUI.schema';

class ClientUIRepo {
    public async getAllUIDetails(details: FindOptions<ClientUIData>,schema:string) {
        return ClientUISchema.schema(schema).findAll(details);
    }

    public async getUIDetails(details: FindOptions<ClientUIData>,schema:string) {
        return ClientUISchema.schema(schema).findOne(details);
    }

    public async createClientUI(uiDetails: ClientUIData,schema:string) {
        return ClientUISchema.schema(schema).create(uiDetails);
    }

    public async updateClientUI(
        uiDetails: Partial<ClientUIData>,
        options: UpdateOptions<ClientUIData>,
        schema:string
    ) {
        return ClientUISchema.schema(schema).update(uiDetails, options);
    }

    
}

export default new ClientUIRepo();
