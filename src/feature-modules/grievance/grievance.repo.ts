import { FindOptions, UpdateOptions } from 'sequelize';
import { Grievance } from './grievance.type';
import { GrievanceSchema } from './grievance.schema';
import { SchemaName } from '../../utility/umzug-migration';

class GrievanceRepo {
    public async create(grievance: Grievance, schema: SchemaName) {
        return GrievanceSchema.schema(schema).create(grievance);
    }

    public async getAll(options: FindOptions<Grievance>, schema: SchemaName) {
        return GrievanceSchema.schema(schema).findAll(options);
    }

    public async get(options: FindOptions<Grievance>, schema: SchemaName) {
        return GrievanceSchema.schema(schema).findOne(options);
    }

    public async update(
        grievanceType: Partial<Grievance>,
        options: UpdateOptions<Grievance>,
        schema: SchemaName,
    ) {
        return GrievanceSchema.schema(schema).update(grievanceType, options);
    }

    public async delete(
        userId: string,
        options: UpdateOptions<Grievance>,
        schema: SchemaName,
    ) {
        return GrievanceSchema.schema(schema).update(
            { isDeleted: true, deletedBy: userId },
            options,
        );
    }
}

export default new GrievanceRepo();
