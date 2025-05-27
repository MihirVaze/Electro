import { Credentials } from '../auth/auth.type';
import { ElectroRoleSchema } from '../role/role.schema';
import roleServices from '../role/role.services';
import userLocationService from '../userLocation/userLocation.service';
import userRepo from './user.repo';
import { USER_RESPONSES } from './user.responses';
import { User, UserRole, UserRoleLocation } from './user.types';

class UserServices {
    async findOne(user: Partial<Credentials>, schema: string) {
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

    async getPassword(id: string, schema: string) {
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

    async createUser(user: User, schema: string) {
        try {
            const result = (await userRepo.createUser(user, schema)).dataValues;
            const responses = USER_RESPONSES.USER_CREATED;
            return { result, responses };
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async update(user: Partial<User>, schema: string) {
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

    async deleteUser(id: string, schema: string) {
        try {
            const result = await userRepo.deleteUser({ where: { id } }, schema);
            if (!result[0]) throw USER_RESPONSES.USER_DELETION_FAILED;
            return USER_RESPONSES.USER_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getUserRoles(UserRole: Partial<UserRole>, schema: string) {
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
                            model: ElectroRoleSchema,
                            attributes: ['role'],
                            where: { isDeleted: false },
                        },
                    ],
                },
                schema,
            );
            return result.rows.map((e) => e.dataValues);
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getAllRoles(schema: string) {
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
            return result.rows.map((e) => e.dataValues);
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async createUserRole(UserRole: UserRole, schema: string) {
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
        schema: string,
    ) {
        try {
            const createUser = await this.createUser(user, schema);
            if (!createUser.result.id) throw 'ID NOT FOUND';

            const roles = await this.addRoles(
                createUser.result.id,
                UserRoles,
                schema,
            );

            return USER_RESPONSES.USER_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async addRoles(
        userId: string,
        UserRoles: UserRoleLocation[],
        schema: string,
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
                    case 'client_admin':
                        throw "CLIENT CAN'T BE CREATED HERE";

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
                        await this.createUserRole(
                            {
                                userId,
                                roleId: userRole.roleId,
                            },
                            schema,
                        );

                        break;

                    case 'superadmin':
                        await this.createUserRole(
                            {
                                userId,
                                roleId: userRole.roleId,
                            },
                            schema,
                        );
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
}

export default new UserServices();
