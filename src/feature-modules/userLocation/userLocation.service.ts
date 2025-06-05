import { SchemaName } from '../../utility/umzug-migration';
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
    async getAllUserState(stateUser: Partial<StateUser>, schema: SchemaName) {
        try {
            const result = await userLocationRepo.getAllUserState(
                {
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
                },
                schema,
            );
            return result.rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserState(schema: SchemaName) {
        try {
            const result = await userLocationRepo.getUserState(
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
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_STATE_LOCATION_NOT_FOUND;
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createUserState(stateUser: StateUser, schema: SchemaName) {
        try {
            const result = await userLocationRepo.createUserState(
                stateUser,
                schema,
            );
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_STATE_LOCATION_CREATION_FAILED;
            return USER_LOCATION_RESPONSES.USER_STATE_LOCATION_CREATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUserState(
        stateUser: Partial<StateUser>,
        userId: string,
        schema: SchemaName,
    ) {
        try {
            const result = await userLocationRepo.updateUserState(
                stateUser,
                {
                    where: { userId },
                },
                schema,
            );
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_UPDATE_USER_STATE_LOCATION;
            return USER_LOCATION_RESPONSES.USER_STATE_LOCATION_UPDATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUserState(userId: string, schema: SchemaName) {
        try {
            const result = await userLocationRepo.deleteUserState(
                {
                    where: { userId },
                },
                schema,
            );
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_DELETE_USER_STATE_LOCATION;
            return USER_LOCATION_RESPONSES.DELETED_USER_STATE_LOCATION;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //DISTRICT
    async getAllUserDistrict(
        districtUser: Partial<DistrictUser>,
        schema: SchemaName,
    ) {
        try {
            const result = await userLocationRepo.getAllUserDistrict(
                {
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
                },
                schema,
            );
            return result.rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserDistrict(schema: SchemaName) {
        try {
            const result = await userLocationRepo.getUserDistrict(
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
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_DISTRICT_LOCATION_NOT_FOUND;
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createUserDistrict(districtUser: DistrictUser, schema: SchemaName) {
        try {
            const result = await userLocationRepo.createUserDistrict(
                districtUser,
                schema,
            );
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
        schema: SchemaName,
    ) {
        try {
            const result = await userLocationRepo.updateUserDistrict(
                districtUser,
                { where: { userId } },
                schema,
            );
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_UPDATE_USER_DISTRICT_LOCATION;
            return USER_LOCATION_RESPONSES.USER_DISTRICT_LOCATION_UPDATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUserDistrict(userId: string, schema: SchemaName) {
        try {
            const result = await userLocationRepo.deleteUserDistrict(
                {
                    where: { userId },
                },
                schema,
            );
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_DELETE_USER_DISTRICT_LOCATION;
            return USER_LOCATION_RESPONSES.DELETED_USER_DISTRICT_LOCATION;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //CITY
    async getAllUserCity(cityUser: Partial<CityUser>, schema: SchemaName) {
        try {
            const result = await userLocationRepo.getAllUserCity(
                {
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
                },
                schema,
            );
            return result.rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserCity(schema: SchemaName) {
        try {
            const result = await userLocationRepo.getUserCity(
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
            if (!result)
                throw USER_LOCATION_RESPONSES.USER_CITY_LOCATION_NOT_FOUND;
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createUserCity(cityUser: CityUser, schema: SchemaName) {
        try {
            const result = await userLocationRepo.createUserCity(
                cityUser,
                schema,
            );
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
        schema: SchemaName,
    ) {
        try {
            switch (type) {
                case 'state':
                    for (const location of locationIds) {
                        const result = await userLocationRepo.createUserState(
                            {
                                userId,
                                stateId: location,
                            },
                            schema,
                        );
                    }
                    return USER_LOCATION_RESPONSES.USER_STATE_LOCATION_CREATED;

                case 'district':
                    for (const location of locationIds) {
                        const result =
                            await userLocationRepo.createUserDistrict(
                                {
                                    userId,
                                    districtId: location,
                                },
                                schema,
                            );
                    }
                    return USER_LOCATION_RESPONSES.USER_DISTRICT_LOCATION_CREATED;

                case 'city':
                    for (const location of locationIds) {
                        const result = await userLocationRepo.createUserCity(
                            {
                                userId,
                                cityId: location,
                            },
                            schema,
                        );
                    }
                    return USER_LOCATION_RESPONSES.USER_CITY_LOCATION_CREATED;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUserCity(
        cityUser: Partial<CityUser>,
        userId: string,
        schema: SchemaName,
    ) {
        try {
            const result = await userLocationRepo.updateUserCity(
                cityUser,
                {
                    where: { userId },
                },
                schema,
            );
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_UPDATE_USER_CITY_LOCATION;
            return USER_LOCATION_RESPONSES.USER_CITY_LOCATION_UPDATED;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUserCity(userId: string, schema: SchemaName) {
        try {
            const result = await userLocationRepo.deleteUserCity(
                {
                    where: { userId },
                },
                schema,
            );
            if (!result[0])
                throw USER_LOCATION_RESPONSES.CANNOT_DELETE_USER_CITY_LOCATION;
            return USER_LOCATION_RESPONSES.DELETED_USER_CITY_LOCATION;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async StateToCity(userId: string, schema: SchemaName) {
        try {
            const result = await userLocationRepo.getAllUserState(
                {
                    where: { userId, isDeleted: false },
                    attributes: [],
                    include: [
                        {
                            model: StateSchema,
                            as: 'state',
                            attributes: [],
                            include: [
                                {
                                    model: DistrictSchema,
                                    as: 'districts',
                                    attributes: [],
                                    include: [
                                        {
                                            model: CitySchema,
                                            as: 'cities',
                                            attributes: ['id'],
                                            where: { isDeleted: false },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                schema,
            );
            return result.rows.reduce((acc: string[], e: any) => {
                const id = e?.dataValues?.state?.district?.city?.id;
                if (id) acc.push(id);
                return acc;
            }, []);
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async StateToDistrict(userId: string, schema: SchemaName) {
        try {
            const result = await userLocationRepo.getAllUserState(
                {
                    where: { userId, isDeleted: false },
                    attributes: [],
                    include: [
                        {
                            model: StateSchema,
                            as: 'state',
                            attributes: [],
                            include: [
                                {
                                    model: DistrictSchema,
                                    as: 'districts',
                                    attributes: ['id'],
                                    where: { isDeleted: false },
                                },
                            ],
                        },
                    ],
                },
                schema,
            );
            return result.rows.reduce((acc: string[], e: any) => {
                const id = e?.dataValues?.state?.district?.id;
                if (id) acc.push(id);
                return acc;
            }, []);
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async DistrictToCity(userId: string, schema: SchemaName) {
        try {
            const result = await userLocationRepo.getAllUserDistrict(
                {
                    where: { userId, isDeleted: false },
                    attributes: [],
                    include: [
                        {
                            model: DistrictSchema,
                            as: 'districts',
                            attributes: ['id'],
                            where: { isDeleted: false },
                            include: [
                                {
                                    model: CitySchema,
                                    as: 'cities',
                                    attributes: ['id'],
                                    where: { isDeleted: false },
                                },
                            ],
                        },
                    ],
                },
                schema,
            );
            return result.rows.reduce((acc: string[], e: any) => {
                const id = e?.dataValues?.state?.district?.id;
                if (id) acc.push(id);
                return acc;
            }, []);
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    // Get All Location IDS
    async GetUserLocationIds(
        schema: SchemaName,
        userId: string,
        locationType: LocationType,
        returnLocatinType: LocationType,
    ) {
        try {
            let result: string[] = [];
            switch (locationType) {
                case 'state':
                    if (returnLocatinType === 'city')
                        return await this.StateToCity(userId, schema);
                    else if (returnLocatinType === 'district')
                        return await this.StateToDistrict(userId, schema);
                    else if (returnLocatinType === 'state') {
                        const result = await this.getAllUserState(
                            { userId, isDeleted: false },
                            schema,
                        );
                        return result.map((e) => e.dataValues.stateId);
                    }
                    break;

                case 'district':
                    if (returnLocatinType === 'city')
                        return await this.DistrictToCity(userId, schema);
                    else if (returnLocatinType === 'district') {
                        const result = await this.getAllUserDistrict(
                            { userId, isDeleted: false },
                            schema,
                        );
                        return result.map((e) => e.dataValues.districtId);
                    }

                    break;

                case 'city':
                    if (returnLocatinType === 'city') {
                        const result = await this.getAllUserCity(
                            { userId, isDeleted: false },
                            schema,
                        );
                        return result.map((e) => e.dataValues.cityId);
                    }
                    break;
            }
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new UserLocationService();
