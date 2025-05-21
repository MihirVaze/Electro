import { RoleSchema } from "./role.schema"
import { Role } from "./role.types"

const getRole = async (role: Partial<Role>) => {
  try {
    const result = await RoleSchema.findOne({ where: role })
    if (!result) throw new Error("Role Not Found")
    return result.dataValues
  } catch (error) {
    throw (error);
  }
}

const getAllRoles = async () => {
  try {
    const result = await RoleSchema.findAll()
    return result
  } catch (error) {
    throw (error)
  }
}

const create = async (role: Role) => {
  try {
    const result = await RoleSchema.create(role)
    return result
  } catch (error) {
    throw (error)
  }
}

export default {
  create,
  getRole,
  getAllRoles
}