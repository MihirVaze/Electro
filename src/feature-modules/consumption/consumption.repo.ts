import { FindOptions, UpdateOptions } from 'sequelize';
import { ConsumptionSchema } from './consumption.schema';
import { Consumption } from './conumption.type';

class ConsumptionRepo {
    public async getAllConsumptions(details: FindOptions<Consumption>, schema: string) {
        return ConsumptionSchema.schema(schema).findAndCountAll(details);
    }

    public async getOneConsumption(details: FindOptions<Consumption>, schema: string) {
        return ConsumptionSchema.schema(schema).findOne(details);
    }

    public async createConsumption(consumptionDetails: Consumption, schema: string) {
        return ConsumptionSchema.schema(schema).create(consumptionDetails);
    }

    public async updateConsumption(
        updates: Partial<Consumption>,
        options: UpdateOptions<Consumption>,
        schema: string
    ) {
        return ConsumptionSchema.schema(schema).update(updates, options);
    }
}

export default new ConsumptionRepo();
