import { FindOptions, UpdateOptions } from 'sequelize';
import { RoleSchema } from './role.schema';
import { Role } from './role.types';

class RoleRepo {
  public async get(options: FindOptions<Role>) {
    return RoleSchema.findOne(options);
  }

  public async getAll(options: FindOptions<Role>) {
    return RoleSchema.findAndCountAll(options);
  }

  public async update(Role: Partial<Role>, options: UpdateOptions<Role>) {
    return RoleSchema.update(Role, options);
  }

  public async delete(options: UpdateOptions<Role>) {
    return RoleSchema.update({ isDeleted: true }, options);
  }
}

export default new RoleRepo();
