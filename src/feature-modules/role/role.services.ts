import roleRepo from "./role.repo"
import { RoleResponses } from "./role.responces"
import { Role } from "./role.types"

const getRole = async (role: Partial<Role>) => {
	try {
		const result = await roleRepo.getRole(role)
		return result
	} catch (error) {
		console.log(error)
		throw RoleResponses.ROLE_NOT_FOUND;
	}
}

const getAllRoles = async () => {
	try {
		const result = await roleRepo.getAllRoles()
		return result.map(e => e.dataValues)
	} catch (error) {
		console.log(error)
		throw RoleResponses.ROLE_NOT_FOUND
	}
}

const create = async (role: Role) => {

}

export default {
	create,
	getRole,
	getAllRoles
}