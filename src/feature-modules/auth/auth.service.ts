import { sign } from "jsonwebtoken";
import userService from "../user/user.service";
import { AuthResponses } from "./auth.responses";
import { ChangePassWord, Credentials } from "./auth.type";
import roleServices from "../role/role.services";
import bcrypt from "bcryptjs";
import { compareEncryption, hashPassword } from "../../utility/password.generator";

class AuthenticationServices {

    async login(credentials: Credentials) {
        try {
            const user = await userService.findOne({ email: credentials.email });
            if (!user) throw AuthResponses.INVALID_CREDENTIALS;

            const isValidUser = await bcrypt.compare(credentials.password, user.password)
            if (!isValidUser) throw AuthResponses.INVALID_CREDENTIALS;

            const { id } = user;
            if (!id) throw new Error("id not found");

            const EmployeeRoles = await userService.getUserRoles({ userId: id })
            const roleIDs = EmployeeRoles.map(e => e.id)
            const token = sign({ id, roleIDs }, process.env.JWT_SECRET_KEY);

            // THIS GIVES THE ARRAY OF ALL THE VALID ROLES FOR THAT PERTICULAR USER
            const roles = await Promise.all(
                roleIDs.map(
                    async e => (await roleServices.getRole({ id: e })).role));

            return { token, roles };
        } catch (e) {
            throw e;
        }
    }

    async update(change: ChangePassWord) {
        try {
            if (!change.id) throw "ID NOT FOUND";

            const oldPassword = await userService.getPassword(change.id)
            const comparePass = await compareEncryption(oldPassword, change.oldPassword)
            if (!comparePass) throw AuthResponses.INVALID_CREDENTIALS

            const hashedPassword = await hashPassword(change.newPassword);
            const result = await userService.update({ id: change.id, password: hashedPassword });
            return AuthResponses.PASSWORD_CHANGED
        } catch (e) {
            console.dir(e)
            throw e
        }
    }
}

export default new AuthenticationServices