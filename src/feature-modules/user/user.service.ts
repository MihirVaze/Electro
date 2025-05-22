import { Credentials } from "../auth/auth.type";
import { RoleSchema } from "../role/role.schema";
import userRepo from "./user.repo";
import { USER_RESPONSES } from "./user.responses";
import { User, UserRole } from "./user.types";

class UserServices {

    async findOne(user: Partial<Credentials>) {
        try {
            const userRecord = await userRepo.getUser({
                where: { email: user.email, isDeleted: false },
                attributes: {
                    exclude: [
                        'isDeleted', 'deletedBy', 'deletedAt',
                        'restoredBy', 'restoredAt',
                        'createdBy', 'updatedBy'
                    ]
                }
            });

            if (!userRecord) throw USER_RESPONSES.USER_NOT_FOUND;

            return userRecord.dataValues;
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async getPassword(id: string) {
        try {
            const userRecord = await userRepo.getUser({
                where: { id, isDeleted: false },
                attributes: {
                    exclude: [
                        'isDeleted', 'deletedBy', 'deletedAt',
                        'restoredBy', 'restoredAt',
                        'createdBy', 'updatedBy'
                    ]
                }
            });
            if (!userRecord) throw USER_RESPONSES.USER_NOT_FOUND;

            return userRecord.dataValues.password;
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async createUser(user: User) {
        try {
            const result = (await userRepo.create(user)).dataValues;
            const response = USER_RESPONCES.USER_CREATED;
            return { result, response }
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async update(user: Partial<User>) {
        try {
            if (!user.id) throw "ID NOT FOUND"
            const result = await userRepo.updateUser(user, { where: { id: user.id } });
            if (!result[0]) throw USER_RESPONSES.USER_UPDATION_FAILED;
            return USER_RESPONSES.USER_UPDATED
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async deleteUser(id: string) {
        try {
            const result = await userRepo.deleteUser({ where: { id } });
            if (!result[0]) throw USER_RESPONSES.USER_DELETION_FAILED;
            return USER_RESPONSES.USER_DELETED
        } catch (e) {
            console.dir(e)
            throw e
        }
    }

    async getUserRoles(UserRole: Partial<UserRole>) {
        try {
            const result = await userRepo.getAllUserRole({
                where: { ...UserRole, isDeleted: false },
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
            const result = await userRepo.getAllUserRole({
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

    async create(UserRole: UserRole) {
        try {
            const result = await userRepo.createUserRole(UserRole);
            return USER_RESPONSES.USER_ROLE_CREATION_FAILED

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default new UserServices()