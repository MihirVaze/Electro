import roleRepo from "./role.repo"
import { ROLE_RESPONSES } from "./role.responses"
import { Role } from "./role.types"

class RoleServices {

	async getRole(role: Partial<Role>) {
		try {
			const result = await roleRepo.get({
				where: { ...role, isDeleted: false },
				attributes: {
					exclude: [
						'isDeleted', 'deletedBy', 'deletedAt',
						'restoredBy', 'restoredAt',
						'createdBy', 'updatedBy'
					]
				},
			})
			if (!result) throw ROLE_RESPONSES.ROLE_NOT_FOUND;
<<<<<<< HEAD
<<<<<<< HEAD
=======
			if (!result) throw ROLE_RESPONSES.ROLE_NOT_FOUND;
>>>>>>> feature/plan-module
=======
			if (!result) throw ROLE_RESPONSES.ROLE_NOT_FOUND;
>>>>>>> da9fa93040dcce2eb25957b486551613b447b643
			return result.dataValues
		} catch (e) {
			console.log(e)
			throw e;
		}
	}

	async getAllRoles() {
		try {
			const result = await roleRepo.getAll({
				where: { isDeleted: false },
				attributes: {
					exclude: [
						'isDeleted', 'deletedBy', 'deletedAt',
						'restoredBy', 'restoredAt',
						'createdBy', 'updatedBy'
					]
				}
			})
			return result.rows.map(e => e.dataValues)
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}

export default new RoleServices()