import { FindOptions, UpdateOptions } from 'sequelize';
import { RoleSchema } from './role.schema';
import { Role } from './role.types';

class RoleRepo {
    public async get(options: FindOptions<Role>, schema: string) {
        return RoleSchema.schema(schema).findOne(options);
    }

    public async getAll(options: FindOptions<Role>, schema: string) {
        return RoleSchema.schema(schema).findAndCountAll(options);
    }

    public async update(
        Role: Partial<Role>,
        options: UpdateOptions<Role>,
        schema: string,
    ) {
        return RoleSchema.schema(schema).update(Role, options);
    }

    public async delete(options: UpdateOptions<Role>, schema: string) {
        return RoleSchema.schema(schema).update({ isDeleted: true }, options);
    }
}

export default new RoleRepo();
