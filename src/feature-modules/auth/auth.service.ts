import { sign } from "jsonwebtoken";
import userService from "../user/user.service";
import { AUTH_RESPONSES } from "./auth.responses";
import { ChangePassWord, Credentials } from "./auth.type";
import roleServices from "../role/role.services";
import { compareEncryption, hashPassword } from "../../utility/password.generator";
<<<<<<< HEAD
<<<<<<< HEAD
import employeeService from "../employee/employee.service";
=======


>>>>>>> feature/plan-module
=======


>>>>>>> da9fa93040dcce2eb25957b486551613b447b643

class AuthenticationServices {

    async login(credentials: Credentials) {
        try {
            const user = await userService.findOne({ email: credentials.email });
            if (!user) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
<<<<<<< HEAD
<<<<<<< HEAD

=======
           
>>>>>>> feature/plan-module
=======
           
>>>>>>> da9fa93040dcce2eb25957b486551613b447b643
            const isValidUser = await compareEncryption(user.password,credentials.password)
            if (!isValidUser) throw AUTH_RESPONSES.INVALID_CREDENTIALS;

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
            if (!comparePass) throw AUTH_RESPONSES.INVALID_CREDENTIALS

<<<<<<< HEAD
<<<<<<< HEAD
            const hashedPassword = await hashPassword(change.newPassword);
            const result = await userService.update({ id: change.id, password: hashedPassword });
            return AUTH_RESPONSES.PASSWORD_CHANGED
=======
=======
>>>>>>> da9fa93040dcce2eb25957b486551613b447b643
            if (!comparePass) throw AUTH_RESPONSES.INVALID_CREDENTIALS


            const hashedPassword = await hashPassword(change.newPassword);
            const result = await userService.update({ id: change.id, password: hashedPassword });
            return AUTH_RESPONSES.PASSWORD_CHANGED
            return AUTH_RESPONSES.PASSWORD_CHANGED
<<<<<<< HEAD
>>>>>>> feature/plan-module
=======
>>>>>>> da9fa93040dcce2eb25957b486551613b447b643
        } catch (e) {
            console.dir(e)
            throw e
        }
    }
}

export default new AuthenticationServices