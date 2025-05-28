import { FindOptions, UpdateOptions } from 'sequelize';
import { GrievanceTypeSchema } from './grievanceType.schema';
import { GrievanceType } from './grievanceType.type';

class GrievanceTypeRepo {
    public async create(grievanceType: GrievanceType, schema: string) {
        return GrievanceTypeSchema.schema(schema).create(grievanceType);
    }

    public async getAll(options: FindOptions<GrievanceType>, schema: string) {
        return GrievanceTypeSchema.schema(schema).findAll(options);
    }

    public async get(options: FindOptions<GrievanceType>, schema: string) {
        return GrievanceTypeSchema.schema(schema).findOne(options);
    }

    public async update(
        grievanceType: Partial<GrievanceType>,
        options: UpdateOptions<GrievanceType>,
        schema: string,
    ) {
        return GrievanceTypeSchema.schema(schema).update(
            grievanceType,
            options,
        );
    }

    public async delete(options: UpdateOptions<GrievanceType>, schema: string) {
        return GrievanceTypeSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new GrievanceTypeRepo();
