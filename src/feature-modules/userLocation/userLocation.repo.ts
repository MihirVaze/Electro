import { FindOptions, UpdateOptions } from 'sequelize';
import {
    CityUserSchema,
    DistrictUserSchema,
    StateUserSchema,
} from './userLocation.schema';
import { CityUser, DistrictUser, StateUser } from './userLocation.type';

class UserLocationRepo {
    //STATE
    public async createUserState(stateUser: StateUser) {
        return StateUserSchema.create(stateUser);
    }

    public async getUserState(options: FindOptions<StateUser>) {
        return StateUserSchema.findOne(options);
    }

    public async getAllUserState(options: FindOptions<StateUser>) {
        return StateUserSchema.findAndCountAll(options);
    }

    public async updateUserState(
        stateUser: Partial<StateUser>,
        options: UpdateOptions<StateUser>,
    ) {
        return StateUserSchema.update(stateUser, options);
    }

    public async deleteUserState(options: UpdateOptions<StateUser>) {
        return StateUserSchema.update({ isDeleted: true }, options);
    }

    //DISTRICT
    public async createUserDistrict(districtUser: DistrictUser) {
        return DistrictUserSchema.create(districtUser);
    }

    public async getUserDistrict(options: FindOptions<DistrictUser>) {
        return DistrictUserSchema.findOne(options);
    }

    public async getAllUserDistrict(options: FindOptions<DistrictUser>) {
        return DistrictUserSchema.findAndCountAll(options);
    }

    public async updateUserDistrict(
        districtUser: Partial<DistrictUser>,
        options: UpdateOptions<DistrictUser>,
    ) {
        return DistrictUserSchema.update(districtUser, options);
    }

    public async deleteUserDistrict(options: UpdateOptions<DistrictUser>) {
        return DistrictUserSchema.update({ isDeleted: true }, options);
    }

    //CITY
    public async createUserCity(cityUser: CityUser) {
        return CityUserSchema.create(cityUser);
    }

    public async getUserCity(options: FindOptions<CityUser>) {
        return CityUserSchema.findOne(options);
    }

    public async getAllUserCity(options: FindOptions<CityUser>) {
        return CityUserSchema.findAndCountAll(options);
    }

    public async updateUserCity(
        cityUser: Partial<CityUser>,
        options: UpdateOptions<CityUser>,
    ) {
        return CityUserSchema.update(cityUser, options);
    }

    public async deleteUserCity(options: UpdateOptions<CityUser>) {
        return CityUserSchema.update({ isDeleted: true }, options);
    }
}

export default new UserLocationRepo();
