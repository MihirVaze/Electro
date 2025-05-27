import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { UserRoleSchema, UserSchema } from './user.schema';
import { User, UserRole } from './user.types';

class UserRepo {
    public async createUser(user: User, schema: SchemaName) {
        return UserSchema.schema(schema).create(user);
    }

    public async getUser(options: FindOptions<User>, schema: SchemaName) {
        return UserSchema.schema(schema).findOne(options);
    }

    public async getAllUser(options: FindOptions<User>, schema: SchemaName) {
        return UserSchema.schema(schema).findAndCountAll(options);
    }

    public async updateUser(
        user: Partial<User>,
        options: UpdateOptions<User>,
        schema: SchemaName,
    ) {
        return UserSchema.schema(schema).update(user, options);
    }

    public async deleteUser(options: UpdateOptions<User>, schema: SchemaName) {
        return UserSchema.schema(schema).update({ isDeleted: true }, options);
    }

    public async createUserRole(UserRole: UserRole, schema: SchemaName) {
        return UserRoleSchema.schema(schema).create(UserRole);
    }

    public async getUserRole(
        options: FindOptions<UserRole>,
        schema: SchemaName,
    ) {
        return UserRoleSchema.schema(schema).findOne(options);
    }

    public async getAllUserRole(
        options: FindOptions<UserRole>,
        schema: SchemaName,
    ) {
        return UserRoleSchema.schema(schema).findAndCountAll(options);
    }

    public async updateUserRole(
        UserRole: Partial<UserRole>,
        options: UpdateOptions<UserRole>,
        schema: SchemaName,
    ) {
        return UserRoleSchema.schema(schema).update(UserRole, options);
    }

    public async deleteUserRole(
        options: UpdateOptions<UserRole>,
        schema: SchemaName,
    ) {
        return UserRoleSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new UserRepo();
