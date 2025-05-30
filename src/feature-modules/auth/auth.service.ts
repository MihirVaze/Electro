import { SchemaName } from '../../utility/umzug-migration';
import { sign } from 'jsonwebtoken';
import userService from '../user/user.service';
import { AUTH_RESPONSES } from './auth.responses';
import { ChangePassWord, Credentials, Payload } from './auth.type';
import roleServices from '../role/role.services';
import {
    compareEncryption,
    hashPassword,
} from '../../utility/password.generator';
import clientService from '../client/client.service';
import { ROLE } from '../role/role.data';

class AuthenticationServices {
    async login(credentials: Credentials, schema: SchemaName) {
        try {
            const user = await userService.findOne(
                {
                    email: credentials.email,
                },
                schema,
            );
            if (!user) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
            const isValidUser = await compareEncryption(
                user.password,
                credentials.password,
            );
            if (!isValidUser) throw AUTH_RESPONSES.INVALID_CREDENTIALS;

            const { id } = user;
            if (!id) throw new Error('id not found');

            const EmployeeRoles = await userService.getUserRoles(
                {
                    userId: id,
                },
                schema,
            );
            const roleId = EmployeeRoles.map((e) => e.dataValues.roleId).filter(
                (e): e is string => !!e,
            );

            // THIS GIVES THE ARRAY OF ALL THE VALID ROLES FOR THAT PERTICULAR USER
            const roles = await Promise.all(
                roleId.map(
                    async (e) =>
                        (await roleServices.getRole({ id: e }, schema)).role,
                ),
            );

            const schemaName = roleId.includes(ROLE.CLIENT_ADMIN)
                ? (await clientService.getClient({ userId: id }, schema))
                      .dataValues.schemaName
                : schema;

            const payload: Payload = { id, roleId, schema: schemaName };
            const token = sign(payload, process.env.JWT_SECRET_KEY);

            return { token, roles };
        } catch (e) {
            throw e;
        }
    }

    async update(change: ChangePassWord, schema: SchemaName) {
        try {
            if (!change.id) throw 'ID NOT FOUND';
            const oldPassword = await userService.getPassword(
                change.id,
                schema,
            );
            const comparePass = await compareEncryption(
                oldPassword,
                change.oldPassword,
            );
            if (!comparePass) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
            const hashedPassword = await hashPassword(change.newPassword);
            const result = await userService.updateUser(
                {
                    id: change.id,
                    password: hashedPassword,
                },
                schema,
            );
            return AUTH_RESPONSES.PASSWORD_CHANGED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
}

export default new AuthenticationServices();
