<<<<<<< HEAD
import { sign } from "jsonwebtoken";
import userService from "../user/user.service";
import { AUTH_RESPONSES } from "./auth.responses";
import { ChangePassWord, Credentials } from "./auth.type";
import roleServices from "../role/role.services";
import { compareEncryption, hashPassword } from "../../utility/password.generator";

=======
import { sign } from 'jsonwebtoken';
import userService from '../user/user.service';
import { AUTH_RESPONSES } from './auth.responses';
import { ChangePassWord, Credentials, Payload } from './auth.type';
import roleServices from '../role/role.services';
import { compareEncryption, hashPassword } from '../../utility/password.generator';
>>>>>>> feature/clientUI

class AuthenticationServices {
  async login(credentials: Credentials, schema: string) {
    try {
      const user = await userService.findOne({ email: credentials.email });
      if (!user) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
      const isValidUser = await compareEncryption(user.password, credentials.password);
      if (!isValidUser) throw AUTH_RESPONSES.INVALID_CREDENTIALS;

<<<<<<< HEAD
    async login(credentials: Credentials) {
        try {
            const user = await userService.findOne({ email: credentials.email });
            if (!user) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
            const isValidUser = await compareEncryption(user.password,credentials.password)
            if (!isValidUser) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
=======
      const { id } = user;
      if (!id) throw new Error('id not found');
>>>>>>> feature/clientUI

      const EmployeeRoles = await userService.getUserRoles({ userId: id });
      const roleId = EmployeeRoles.map((e) => e.id).filter((e): e is string => !!e);

<<<<<<< HEAD
            const EmployeeRoles = await userService.getUserRoles({ userId: id })
            const roleIDs = EmployeeRoles.map(e => e.id)
            const token = sign({ id, roleIDs }, process.env.JWT_SECRET_KEY);

            // THIS GIVES THE ARRAY OF ALL THE VALID ROLES FOR THAT PERTICULAR USER
            const roles = await Promise.all(
                roleIDs.map(
                    async e => (await roleServices.getRole({ id: e })).role));
=======
      const payload: Payload = { id, roleId, schema };
      const token = sign(payload, process.env.JWT_SECRET_KEY);

      // THIS GIVES THE ARRAY OF ALL THE VALID ROLES FOR THAT PERTICULAR USER
      const roles = await Promise.all(roleId.map(async (e) => (await roleServices.getRole({ id: e })).role));
>>>>>>> feature/clientUI

      return { token, roles };
    } catch (e) {
      throw e;
    }
  }

  async update(change: ChangePassWord) {
    try {
      if (!change.id) throw 'ID NOT FOUND';

      const oldPassword = await userService.getPassword(change.id);
      const comparePass = await compareEncryption(oldPassword, change.oldPassword);
      if (!comparePass) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
      const hashedPassword = await hashPassword(change.newPassword);
      const result = await userService.update({ id: change.id, password: hashedPassword });
      return AUTH_RESPONSES.PASSWORD_CHANGED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }
}

export default new AuthenticationServices();
