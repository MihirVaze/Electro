import { sign } from "jsonwebtoken";
import userService from "../user/user.service";
import { AuthResponses } from "./auth.responses";
import { ChangePassWord, Credentials } from "./auth.type";
import { User } from "../user/user.types";
import { RoleEnum } from "../role/role.types";
import roleServices from "../role/role.services";
import bcrypt from "bcryptjs";
import { compareEncription, hashPassword } from "../../utility/password.generator";

const login = async (credentials: Credentials) => {
    try {
        const user = await userService.findOne(credentials);
        if (!user) throw AuthResponses.INVALID_CREDENTIALS;

        const isValidUser = await bcrypt.compare(credentials.password, user.password)
        if (!isValidUser) throw AuthResponses.INVALID_CREDENTIALS;

        const { id } = user;
        if (!id) throw new Error("id not found");
        const token = sign({ id, roleIDs: [] }, process.env.JWT_SECRET_KEY);

        //const role = await roleServices.getRole({ id: role_id })
        return { token };
    } catch (e) {
        throw AuthResponses.INVALID_CREDENTIALS;
    }
}

const register = async (user: User, role: RoleEnum) => {
    try {
        const { id } = await roleServices.getRole({ role })
        if (!id) throw Error('ROLE NOT FOUND')

        const hashedPassword = await hashPassword(user.password);
        const result = await userService.createUser({
            ...user,
            password: hashedPassword
        });
        return result
    } catch (e) {
        throw e;
    }
}

const update = async (change: ChangePassWord) => {
    try {
        if (!change.id) throw "ID NOT FOUND";

        const oldPassword = await userService.getUserPass(change.id)
        const comparePass = await compareEncription(oldPassword, change.oldPassword)
        if (!comparePass) throw AuthResponses.INVALID_CREDENTIALS

        const hashedPassword = await hashPassword(change.newPassword);
        const result = await userService.update({ id: change.id, password: hashedPassword });
        return AuthResponses.PASSWORD_CHANGED
    } catch (e) {
        console.dir(e)
        throw AuthResponses.PASSWORD_DIDNOT_CHANGE
    }
}

export default {
    login,
    register,
    update
}