import { HasPermission } from '../../utility/usersPermissions';
import { SchemaName } from '../../utility/umzug-migration';
import { Credentials } from '../auth/auth.type';
import { RoleSchema } from '../role/role.schema';
import roleServices from '../role/role.services';
import userLocationService from '../userLocation/userLocation.service';
import userRepo from './user.repo';
import { USER_RESPONSES } from './user.responses';
import { User, UserRole, UserRoleLocation } from './user.types';
import {
    generatePassword,
    hashPassword,
} from '../../utility/password.generator';
import { sendEmail } from '../../utility/sendmail';

class UserServices {
    async findOne(user: Partial<Credentials>, schema: SchemaName) {
        try {
            const userRecord = await userRepo.getUser(
                {
                    where: { email: user.email, isDeleted: false },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                },
                schema,
            );

            if (!userRecord) throw USER_RESPONSES.USER_NOT_FOUND;

            return userRecord.dataValues;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getPassword(id: string, schema: SchemaName) {
        try {
            const userRecord = await userRepo.getUser(
                {
                    where: { id, isDeleted: false },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                },
                schema,
            );
            if (!userRecord) throw USER_RESPONSES.USER_NOT_FOUND;

            return userRecord.dataValues.password;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async createUser(user: User, schema: SchemaName) {
        try {
            const result = (await userRepo.createUser(user, schema)).dataValues;
            const responses = USER_RESPONSES.USER_CREATED;
            return { result, responses };
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateUser(user: Partial<User>, schema: SchemaName) {
        try {
            if (!user.id) throw 'ID NOT FOUND';
            const result = await userRepo.updateUser(
                user,
                {
                    where: { id: user.id },
                },
                schema,
            );
            if (!result[0]) throw USER_RESPONSES.USER_UPDATION_FAILED;
            return USER_RESPONSES.USER_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteUser(id: string, schema: SchemaName) {
        try {
            const result = await userRepo.deleteUser({ where: { id } }, schema);
            if (!result[0]) throw USER_RESPONSES.USER_DELETION_FAILED;
            return USER_RESPONSES.USER_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getUserRoles(UserRole: Partial<UserRole>, schema: SchemaName) {
        try {
            const result = await userRepo.getAllUserRole(
                {
                    where: { ...UserRole, isDeleted: false },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                    include: [
                        {
                            model: RoleSchema.schema(schema),
                            attributes: ['role'],
                            where: { isDeleted: false },
                        },
                    ],
                },
                schema,
            );
            return result.rows;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getUserRolesIds(userId: string, schema: SchemaName) {
        try {
            const result = await this.getUserRoles({ userId }, schema);
            return result.reduce<string[]>((acc, e) => {
                const id = e.dataValues.roleId;
                if (id) acc.push(id);
                return acc;
            }, []);
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getAllRoles(schema: SchemaName) {
        try {
            const result = await userRepo.getAllUserRole(
                {
                    where: { isDeleted: false },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                },
                schema,
            );
            return result.rows;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async createUserRole(UserRole: UserRole, schema: SchemaName) {
        try {
            const result = await userRepo.createUserRole(UserRole, schema);
            return USER_RESPONSES.USER_ROLE_CREATION_FAILED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async onBoardUser(
        user: User,
        UserRoles: UserRoleLocation[],
        schema: SchemaName,
    ) {
        try {
            // const password = generatePassword(); WILL BE HARDCODING THE PASSWORD FOR TESTING
            const password = '12345';
            const hashedPassword = await hashPassword(password);
            user.password = hashedPassword;

            const createUser = await this.createUser(user, schema);
            if (!createUser.result.id) throw 'ID NOT FOUND';

            const roles = await this.addRoles(
                createUser.result.id,
                UserRoles,
                schema,
            );

            sendEmail(
                user.email,
                'YOUR LOGIN CREDENTIALS ARE',
                `<!DOCTYPE html>
                    <html>

                    <head>
                        <title>Login Credentials </title>
                    </head>

                    <body>
                        <p>Your login credentials are: </p>
                        <p> Email: ${user.email} </p>
                        <p>Password: ${password} </p>
                    </body>

                    </html>`,
            );

            const responses = USER_RESPONSES.USER_CREATED;
            return { result: createUser.result, responses };
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async addRoles(
        userId: string,
        UserRoles: UserRoleLocation[],
        schema: SchemaName,
    ) {
        try {
            for (const userRole of UserRoles) {
                const userRoleEntry = await this.createUserRole(
                    {
                        userId,
                        roleId: userRole.roleId,
                    },
                    schema,
                );

                const role = (
                    await roleServices.getRole({ id: userRole.roleId }, schema)
                ).role;

                switch (role) {
                    case 'customer':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'city',
                            userId,
                            userRole.locationIds,
                            schema,
                        );
                        break;

                    case 'service_worker':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'city',
                            userId,
                            userRole.locationIds,
                            schema,
                        );
                        break;

                    case 'worker':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'city',
                            userId,
                            userRole.locationIds,
                            schema,
                        );
                        break;

                    case 'city_manager':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'city',
                            userId,
                            userRole.locationIds,
                            schema,
                        );
                        break;

                    case 'district_manager':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'district',
                            userId,
                            userRole.locationIds,
                            schema,
                        );
                        break;

                    case 'state_manager':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'state',
                            userId,
                            userRole.locationIds,
                            schema,
                        );
                        break;

                    case 'client_manager':
                        break;
                    case 'client_admin':
                        break;
                    case 'superadmin':
                        break;
                    default:
                        throw 'ENTER A VALID ROLE';
                }
            }

            return USER_RESPONSES.USER_ROLE_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getOneUser(user: Partial<User>, schema: SchemaName) {
        return await userRepo.getUser({ where: user }, schema);
    }
}

export default new UserServices();
