import { FindOptions, UpdateOptions } from "sequelize";
import { CitySchema, DistrictSchema, StateSchema } from "./location.schema";
import { City, District, State } from "./location.type";

class LocationRepo {

    //STATE
    public async createState(state: State) {
        return StateSchema.create(state);
    };

    public async getState(options: FindOptions<State>) {
        return StateSchema.findOne(options);
    };

    public async getAllStates(options: FindOptions<State>) {
        return StateSchema.findAndCountAll(options);
    };

    public async updateState(state: Partial<State>, options: UpdateOptions<State>) {
        return StateSchema.update(state, options);
    };

    public async deleteState(options: UpdateOptions<State>) {
        return StateSchema.update({ isDeleted: true }, options);
    };

    //DISTRICT
    public async createDistrict(district: District) {
        return DistrictSchema.create(district);
    };

    public async getDistrict(options: FindOptions<District>) {
        return DistrictSchema.findOne(options);
    };

    public async getAllDistricts(options: FindOptions<District>) {
        return DistrictSchema.findAndCountAll(options);
    };

    public async updateDistrict(district: Partial<District>, options: UpdateOptions<District>) {
        return DistrictSchema.update(district, options);
    };

    public async deleteDistrict(options: UpdateOptions<District>) {
        return DistrictSchema.update({ isDeleted: true }, options);
    };

    //CITY
    public async createCity(city: City) {
        return CitySchema.create(city);
    };

    public async getCity(options: FindOptions<City>) {
        return CitySchema.findOne(options);
    };

    public async getAllCitys(options: FindOptions<City>) {
        return CitySchema.findAndCountAll(options);
    };

    public async updateCity(city: Partial<City>, options: UpdateOptions<City>) {
        return CitySchema.update(city, options);
    };

    public async deleteCity(options: UpdateOptions<City>) {
        return CitySchema.update({ isDeleted: true }, options);
    };
}

export default new LocationRepo();