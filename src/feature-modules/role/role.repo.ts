import { FindOptions, UpdateOptions } from 'sequelize';
import { ElectroRoleSchema } from './role.schema';
import { ElectroRole } from './role.types';

class RoleRepo {
    public async get(options: FindOptions<ElectroRole>, schema: string) {
        return ElectroRoleSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<ElectroRole>, schema: string) {
        return ElectroRoleSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        Role: Partial<ElectroRole>,
        options: UpdateOptions<ElectroRole>,
        schema: string,
    ) {
        return ElectroRoleSchema.schema(schema).update(Role, options);
    }

    public async delete(options: UpdateOptions<ElectroRole>, schema: string) {
        return ElectroRoleSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new RoleRepo();
