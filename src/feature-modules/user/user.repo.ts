import { FindOptions, UpdateOptions } from "sequelize";
import { UserSchema } from "./user.schema";
import { User } from "./user.types";

class UserRepo {

    public async create(user: User) {
        return UserSchema.create(user);
    }

    public async get(options: FindOptions<User>) {
        return UserSchema.findOne(options);
    }

    public async getAll(options: FindOptions<User>) {
        return UserSchema.findAndCountAll(options);
    }

    public async update(user: Partial<User>, options: UpdateOptions<User>) {
        return UserSchema.update(user, options);
    }

    public async delete(options: UpdateOptions<User>) {
        return UserSchema.update({ isDeleted: true }, options);
    }
}

export default new UserRepo()