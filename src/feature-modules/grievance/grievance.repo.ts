import { FindOptions, UpdateOptions } from 'sequelize';
import { Grievance } from './grievance.type';
import { GrievanceSchema } from './grievance.schema';

class GrievanceRepo {
    public async create(grievance: Grievance, schema: string) {
        return GrievanceSchema.schema(schema).create(grievance);
    }

    public async getAll(options: FindOptions<Grievance>, schema: string) {
        return GrievanceSchema.schema(schema).findAll(options);
    }

    public async get(options: FindOptions<Grievance>, schema: string) {
        return GrievanceSchema.schema(schema).findOne(options);
    }

    public async update(
        grievanceType: Partial<Grievance>,
        options: UpdateOptions<Grievance>,
        schema: string,
    ) {
        return GrievanceSchema.schema(schema).update(grievanceType, options);
    }

    public async delete(options: UpdateOptions<Grievance>, schema: string) {
        return GrievanceSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new GrievanceRepo();
