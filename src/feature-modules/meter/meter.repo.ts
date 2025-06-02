import { FindOptions, UpdateOptions } from 'sequelize';
import { Meter } from './meter.type';
import { MeterSchema } from './meter.schema';

class MeterRepo {
    public async create(meter: Meter, schema: string) {
        return MeterSchema.schema(schema).create(meter);
    }

    public async get(options: FindOptions<Meter>, schema: string) {
        return MeterSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Meter>, schema: string) {
        return MeterSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        meter: Partial<Meter>,
        options: UpdateOptions<Meter>,
        schema: string,
    ) {
        return MeterSchema.schema(schema).update(meter, options);
    }
}

export default new MeterRepo();
