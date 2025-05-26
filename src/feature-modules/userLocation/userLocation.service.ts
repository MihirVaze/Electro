import {
    CitySchema,
    DistrictSchema,
    StateSchema,
} from '../location/location.schema';
import userLocationRepo from './userLocation.repo';
import { USER_LOCATION_RESPONSES } from './userLocation.responses';
import {
    CityUser,
    DistrictUser,
    LocationType,
    StateUser,
} from './userLocation.type';

class UserLocationService {
    //STATE
    async getAllUserState(stateUser: Partial<StateUser>) {
        try {
            const result = await userLocationRepo.getAllUserState({
                where: { ...stateUser, isDeleted: false },
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
                        model: StateSchema,
                        as: 'state',
                        attributes: ['name'],
                        where: { isDeleted: false },
                    },
                ],
            });
            return result.rows.map((e) => e.dataValues);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserState() {
        try {
            const result = await userLocationRepo.getUserState({
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
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_STATE_LOCATION_NOT_FOUND;
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createUserState(stateUser: StateUser) {
        try {
            const result = await userLocationRepo.createUserState(stateUser);
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_STATE_LOCATION_CREATION_FAILED;
            return USER_LOCATION_RESPONSES.USER_STATE_LOCATION_CREATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUserState(stateUser: Partial<StateUser>, userId: string) {
        try {
            const result = await userLocationRepo.updateUserState(stateUser, {
                where: { userId },
            });
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_UPDATE_USER_STATE_LOCATION;
            return USER_LOCATION_RESPONSES.USER_STATE_LOCATION_UPDATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUserState(userId: string) {
        try {
            const result = await userLocationRepo.deleteUserState({
                where: { userId },
            });
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_DELETE_USER_STATE_LOCATION;
            return USER_LOCATION_RESPONSES.DELETED_USER_STATE_LOCATION;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //DISTRICT
    async getAllUserDistrict(districtUser: Partial<DistrictUser>) {
        try {
            const result = await userLocationRepo.getAllUserDistrict({
                where: { ...districtUser, isDeleted: false },
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
                        model: DistrictSchema,
                        as: 'district',
                        attributes: ['name'],
                        where: { isDeleted: false },
                    },
                ],
            });
            return result.rows.map((e) => e.dataValues);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserDistrict() {
        try {
            const result = await userLocationRepo.getUserDistrict({
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
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_DISTRICT_LOCATION_NOT_FOUND;
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createUserDistrict(districtUser: DistrictUser) {
        try {
            const result =
                await userLocationRepo.createUserDistrict(districtUser);
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_DISTRICT_LOCATION_CREATION_FAILED;
            return USER_LOCATION_RESPONSES.USER_DISTRICT_LOCATION_CREATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUserDistrict(
        districtUser: Partial<DistrictUser>,
        userId: string,
    ) {
        try {
            const result = await userLocationRepo.updateUserDistrict(
                districtUser,
                { where: { userId } },
            );
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_UPDATE_USER_DISTRICT_LOCATION;
            return USER_LOCATION_RESPONSES.USER_DISTRICT_LOCATION_UPDATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUserDistrict(userId: string) {
        try {
            const result = await userLocationRepo.deleteUserDistrict({
                where: { userId },
            });
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_DELETE_USER_DISTRICT_LOCATION;
            return USER_LOCATION_RESPONSES.DELETED_USER_DISTRICT_LOCATION;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //CITY
    async getAllUserCity(cityUser: Partial<CityUser>) {
        try {
            const result = await userLocationRepo.getAllUserCity({
                where: { ...cityUser, isDeleted: false },
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
                        model: CitySchema,
                        as: 'city',
                        attributes: ['name'],
                        where: { isDeleted: false },
                    },
                ],
            });
            return result.rows.map((e) => e.dataValues);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserCity() {
        try {
            const result = await userLocationRepo.getUserCity({
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
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_CITY_LOCATION_NOT_FOUND;
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createUserCity(cityUser: CityUser) {
        try {
            const result = await userLocationRepo.createUserCity(cityUser);
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_CITY_LOCATION_CREATION_FAILED;
            return USER_LOCATION_RESPONSES.USER_CITY_LOCATION_CREATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createBulkUserLocations(
        type: LocationType,
        userId: string,
        locationIds: string[],
    ) {
        try {
            switch (type) {
                case 'state':
                    for (const location of locationIds) {
                        const result = await userLocationRepo.createUserState({
                            userId,
                            stateId: location,
                        });
                    }
                    return USER_LOCATION_RESPONSES.USER_STATE_LOCATION_CREATED;

                case 'district':
                    for (const location of locationIds) {
                        const result =
                            await userLocationRepo.createUserDistrict({
                                userId,
                                districtId: location,
                            });
                    }
                    return USER_LOCATION_RESPONSES.USER_DISTRICT_LOCATION_CREATED;

                case 'city':
                    for (const location of locationIds) {
                        const result = await userLocationRepo.createUserCity({
                            userId,
                            cityId: location,
                        });
                    }
                    return USER_LOCATION_RESPONSES.USER_CITY_LOCATION_CREATED;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUserCity(cityUser: Partial<CityUser>, userId: string) {
        try {
            const result = await userLocationRepo.updateUserCity(cityUser, {
                where: { userId },
            });
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_UPDATE_USER_CITY_LOCATION;
            return USER_LOCATION_RESPONSES.USER_CITY_LOCATION_UPDATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUserCity(userId: string) {
        try {
            const result = await userLocationRepo.deleteUserCity({
                where: { userId },
            });
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_DELETE_USER_CITY_LOCATION;
            return USER_LOCATION_RESPONSES.DELETED_USER_CITY_LOCATION;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new UserLocationService();
