import { RoleSchema } from "../role/role.schema";
import employeeRepo from "./employee.repo";
import { EMPLOYEE_RESPONSES } from "./employee.responses";
import { Employee } from "./employee.type";

class EmployeeServices {

    async getEmpRoles(Employee: Partial<Employee>) {
        try {
            const result = await employeeRepo.getAll({
                where: { ...Employee, isDeleted: false },
                attributes: {
                    exclude: [
                        'isDeleted', 'deletedBy', 'deletedAt',
                        'restoredBy', 'restoredAt',
                        'createdBy', 'updatedBy'
                    ]
                },
                include: [{
                    model: RoleSchema,
                    as: 'role',
                    attributes: ['role'],
                    where: { isDeleted: false }
                }]
            })
            return result.rows.map(e => e.dataValues)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getAllRoles() {
        try {
            const result = await employeeRepo.getAll({
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

    async create(Employee: Employee) {
        try {
            const result = await employeeRepo.create(Employee);
            return EMPLOYEE_RESPONSES.EMPLOYEE_CREATION_FAILED

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default new EmployeeServices