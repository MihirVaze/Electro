import { Credentials } from '../auth/auth.type';
import locationService from '../location/location.service';
import { RoleSchema } from '../role/role.schema';
import roleServices from '../role/role.services';
import userLocationService from '../userLocation/userLocation.service';
import userRepo from './user.repo';
import { USER_RESPONSES } from './user.responses';
import { User, UserRole, UserRoleLocation } from './user.types';

class UserServices {
    async findOne(user: Partial<Credentials>) {
        try {
            const userRecord = await userRepo.getUser({
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
            });

            if (!userRecord) throw USER_RESPONSES.USER_NOT_FOUND;

            return userRecord.dataValues;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getPassword(id: string) {
        try {
            const userRecord = await userRepo.getUser({
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
            });
            if (!userRecord) throw USER_RESPONSES.USER_NOT_FOUND;

            return userRecord.dataValues.password;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async createUser(user: User) {
        try {
            const result = (await userRepo.createUser(user)).dataValues;
            const responses = USER_RESPONSES.USER_CREATED;
            return { result, responses };
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async update(user: Partial<User>) {
        try {
            if (!user.id) throw 'ID NOT FOUND';
            const result = await userRepo.updateUser(user, {
                where: { id: user.id },
            });
            if (!result[0]) throw USER_RESPONSES.USER_UPDATION_FAILED;
            return USER_RESPONSES.USER_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteUser(id: string) {
        try {
            const result = await userRepo.deleteUser({ where: { id } });
            if (!result[0]) throw USER_RESPONSES.USER_DELETION_FAILED;
            return USER_RESPONSES.USER_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getUserRoles(UserRole: Partial<UserRole>) {
        try {
            const result = await userRepo.getAllUserRole({
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
                        model: RoleSchema,
                        attributes: ['role'],
                        where: { isDeleted: false },
                    },
                ],
            });
            return result.rows.map((e) => e.dataValues);
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getAllRoles() {
        try {
            const result = await userRepo.getAllUserRole({
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
            });
            return result.rows.map((e) => e.dataValues);
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async createUserRole(UserRole: UserRole) {
        try {
            const result = await userRepo.createUserRole(UserRole);
            return USER_RESPONSES.USER_ROLE_CREATION_FAILED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async onBoardUser(user: User, UserRoles: UserRoleLocation[]) {
        try {
            const createUser = await this.createUser(user);
            if (!createUser.result.id) throw 'ID NOT FOUND';

            const roles = await this.addRoles(createUser.result.id, UserRoles);

            return USER_RESPONSES.USER_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async addRoles(userId: string, UserRoles: UserRoleLocation[]) {
        try {
            for (const userRole of UserRoles) {
                const userRoleEntry = await this.createUserRole({
                    userId,
                    roleId: userRole.roleId,
                });
                const role = (
                    await roleServices.getRole({ id: userRole.roleId })
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
                        );
                        break;

                    case 'city_manager':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'city',
                            userId,
                            userRole.locationIds,
                        );
                        break;

                    case 'district_manager':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'district',
                            userId,
                            userRole.locationIds,
                        );
                        break;

                    case 'state_manager':
                        if (!userRole.locationIds) throw 'LOCATIONS DONT EXIST';
                        await userLocationService.createBulkUserLocations(
                            'state',
                            userId,
                            userRole.locationIds,
                        );
                        break;

                    case 'client_manager':
                        await this.createUserRole({
                            userId,
                            roleId: userRole.roleId,
                        });
                        break;

                    case 'superadmin':
                        await this.createUserRole({
                            userId,
                            roleId: userRole.roleId,
                        });
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
