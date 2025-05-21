import { Credentials } from "../auth/auth.type";
import userRepo from "./user.repo";
import { UserResponses } from "./user.responses";
import { User } from "./user.types";

const findOne = async (user: Credentials) => {
    try {
        const userRecord = await userRepo.findOne({ email: user.email });
        if (!userRecord) throw UserResponses.USER_NOT_FOUND;

        return userRecord.dataValues;
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_NOT_FOUND;
    }
}

const getUserPass = async (id: string) => {
    try {
        const userRecord = await userRepo.findOne({ id });
        if (!userRecord) throw UserResponses.USER_NOT_FOUND;

        return userRecord.dataValues.password;
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_NOT_FOUND;
    }
}

const createUser = async (user: User) => {
    try {
        const result = await userRepo.create(user);
        return UserResponses.USER_CREATED
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_CREATION_FAILED;
    }
}

const update = async (user: Partial<User>) => {
    try {
        if (!user.id) throw "ID NOT FOUND"
        const result = await userRepo.update(user);
        if (!result[0]) throw "UPDATE FAILED";
        return UserResponses.USER_UPDATED
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_UPDATION_FAILED
    }
}

const deleteUser = async (id: string) => {
    try {
        const result = await userRepo.deleteUser(id);
        if (!result[0]) throw "DELETE FAILED";
        return UserResponses.USER_DELETED
    } catch (e) {
        console.dir(e)
        throw UserResponses.USER_DELETION_FAILED
    }
}

export default {
    findOne,
    createUser,
    update,
    deleteUser,
    getUserPass,
}