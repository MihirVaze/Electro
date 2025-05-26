import { FindOptions, UpdateOptions } from 'sequelize';
import { UserRoleSchema, UserSchema } from './user.schema';
import { User, UserRole } from './user.types';

class UserRepo {
  public async createUser(user: User) {
    return UserSchema.create(user);
  }

  public async getUser(options: FindOptions<User>) {
    return UserSchema.findOne(options);
  }

  public async getAllUser(options: FindOptions<User>) {
    return UserSchema.findAndCountAll(options);
  }

  public async updateUser(user: Partial<User>, options: UpdateOptions<User>) {
    return UserSchema.update(user, options);
  }

  public async deleteUser(options: UpdateOptions<User>) {
    return UserSchema.update({ isDeleted: true }, options);
  }

  public async createUserRole(UserRole: UserRole) {
    return UserRoleSchema.create(UserRole);
  }

  public async getUserRole(options: FindOptions<UserRole>) {
    return UserRoleSchema.findOne(options);
  }

  public async getAllUserRole(options: FindOptions<UserRole>) {
    return UserRoleSchema.findAndCountAll(options);
  }

  public async updateUserRole(UserRole: Partial<UserRole>, options: UpdateOptions<UserRole>) {
    return UserRoleSchema.update(UserRole, options);
  }

  public async deleteUserRole(options: UpdateOptions<UserRole>) {
    return UserRoleSchema.update({ isDeleted: true }, options);
  }
}

export default new UserRepo();
