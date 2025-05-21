import { FindOptions, UpdateOptions } from "sequelize";
import { EmployeeSchema } from "./employee.schema";
import { Employee } from "./employee.type";

class EmployeeRepo {

    public async create(Employee: Employee) {
        return EmployeeSchema.create(Employee);
    }

    public async get(options: FindOptions<Employee>) {
        return EmployeeSchema.findOne(options);
    }

    public async getAll(options: FindOptions<Employee>) {
        return EmployeeSchema.findAndCountAll(options);
    }

    public async update(Employee: Partial<Employee>, options: UpdateOptions<Employee>) {
        return EmployeeSchema.update(Employee, options);
    }

    public async delete(options: UpdateOptions<Employee>) {
        return EmployeeSchema.update({ isDeleted: true }, options);
    }
}

export default new EmployeeRepo()