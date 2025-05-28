import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import {
    CityUserSchema,
    DistrictUserSchema,
    StateUserSchema,
} from './userLocation.schema';
import { CityUser, DistrictUser, StateUser } from './userLocation.type';

class UserLocationRepo {
    //STATE
    public async createUserState(stateUser: StateUser, schema: SchemaName) {
        return StateUserSchema.schema(schema).create(stateUser);
    }

    public async getUserState(
        options: FindOptions<StateUser>,
        schema: SchemaName,
    ) {
        return StateUserSchema.schema(schema).findOne(options);
    }

    public async getAllUserState(
        options: FindOptions<StateUser>,
        schema: SchemaName,
    ) {
        return StateUserSchema.schema(schema).findAndCountAll(options);
    }

    public async updateUserState(
        stateUser: Partial<StateUser>,
        options: UpdateOptions<StateUser>,
        schema: SchemaName,
    ) {
        return StateUserSchema.schema(schema).update(stateUser, options);
    }

    public async deleteUserState(
        options: UpdateOptions<StateUser>,
        schema: SchemaName,
    ) {
        return StateUserSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }

    //DISTRICT
    public async createUserDistrict(
        districtUser: DistrictUser,
        schema: SchemaName,
    ) {
        return DistrictUserSchema.schema(schema).create(districtUser);
    }

    public async getUserDistrict(
        options: FindOptions<DistrictUser>,
        schema: SchemaName,
    ) {
        return DistrictUserSchema.schema(schema).findOne(options);
    }

    public async getAllUserDistrict(
        options: FindOptions<DistrictUser>,
        schema: SchemaName,
    ) {
        return DistrictUserSchema.schema(schema).findAndCountAll(options);
    }

    public async updateUserDistrict(
        districtUser: Partial<DistrictUser>,
        options: UpdateOptions<DistrictUser>,
        schema: SchemaName,
    ) {
        return DistrictUserSchema.schema(schema).update(districtUser, options);
    }

    public async deleteUserDistrict(
        options: UpdateOptions<DistrictUser>,
        schema: SchemaName,
    ) {
        return DistrictUserSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }

    //CITY
    public async createUserCity(cityUser: CityUser, schema: SchemaName) {
        return CityUserSchema.schema(schema).create(cityUser);
    }

    public async getUserCity(
        options: FindOptions<CityUser>,
        schema: SchemaName,
    ) {
        return CityUserSchema.schema(schema).findOne(options);
    }

    public async getAllUserCity(
        options: FindOptions<CityUser>,
        schema: SchemaName,
    ) {
        return CityUserSchema.schema(schema).findAndCountAll(options);
    }

    public async updateUserCity(
        cityUser: Partial<CityUser>,
        options: UpdateOptions<CityUser>,
        schema: SchemaName,
    ) {
        return CityUserSchema.schema(schema).update(cityUser, options);
    }

    public async deleteUserCity(
        options: UpdateOptions<CityUser>,
        schema: SchemaName,
    ) {
        return CityUserSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }
}

export default new UserLocationRepo();
