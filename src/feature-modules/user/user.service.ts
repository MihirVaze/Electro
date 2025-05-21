import { Credentials } from "../auth/auth.type";
import userRepo from "./user.repo";
import { USER_RESPONCES } from "./user.responses";
import { User } from "./user.types";

class UserServices {

    async findOne(user: Partial<Credentials>) {
        try {
            const userRecord = await userRepo.get({
                where: { email: user.email, isDeleted: false },
                attributes: {
                    exclude: [
                        'isDeleted', 'deletedBy', 'deletedAt',
                        'restoredBy', 'restoredAt',
                        'createdBy', 'updatedBy'
                    ]
                }
            });

            if (!userRecord) throw USER_RESPONCES.USER_NOT_FOUND;

            return userRecord.dataValues;
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async getPassword(id: string) {
        try {
            const userRecord = await userRepo.get({
                where: { id, isDeleted: false },
                attributes: {
                    exclude: [
                        'isDeleted', 'deletedBy', 'deletedAt',
                        'restoredBy', 'restoredAt',
                        'createdBy', 'updatedBy'
                    ]
                }
            });
            if (!userRecord) throw USER_RESPONCES.USER_NOT_FOUND;

            return userRecord.dataValues.password;
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async createUser(user: User) {
        try {
            const result = await userRepo.create(user);
            return USER_RESPONCES.USER_CREATED
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async update(user: Partial<User>) {
        try {
            if (!user.id) throw "ID NOT FOUND"
            const result = await userRepo.update(user, { where: { id: user.id } });
            if (!result[0]) throw USER_RESPONCES.USER_UPDATION_FAILED;
            return USER_RESPONCES.USER_UPDATED
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async deleteUser(id: string) {
        try {
            const result = await userRepo.delete({ where: { id } });
            if (!result[0]) throw USER_RESPONCES.USER_DELETION_FAILED;
            return USER_RESPONCES.USER_DELETED
        } catch (e) {
            console.dir(e)
            throw e
        }
    }
}

export default new UserServices()