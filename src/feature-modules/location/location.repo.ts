import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, UpdateOptions } from 'sequelize';
import { CitySchema, DistrictSchema, StateSchema } from './location.schema';
import { City, District, State } from './location.type';

class LocationRepo {
    //STATE
    public async createState(state: State, schema: SchemaName) {
        return StateSchema.schema(schema).create(state);
    }

    public async getState(options: FindOptions<State>, schema: SchemaName) {
        return StateSchema.schema(schema).findOne(options);
    }

    public async getAllStates(options: FindOptions<State>, schema: SchemaName) {
        return StateSchema.schema(schema).findAndCountAll(options);
    }

    public async updateState(
        state: Partial<State>,
        options: UpdateOptions<State>,
        schema: SchemaName,
    ) {
        return StateSchema.schema(schema).update(state, options);
    }

    public async deleteState(
        options: UpdateOptions<State>,
        schema: SchemaName,
    ) {
        return StateSchema.schema(schema).update({ isDeleted: true }, options);
    }

    //DISTRICT
    public async createDistrict(district: District, schema: SchemaName) {
        return DistrictSchema.schema(schema).create(district);
    }

    public async getDistrict(
        options: FindOptions<District>,
        schema: SchemaName,
    ) {
        return DistrictSchema.schema(schema).findOne(options);
    }

    public async getAllDistricts(
        options: FindOptions<District>,
        schema: SchemaName,
    ) {
        return DistrictSchema.schema(schema).findAndCountAll(options);
    }

    public async updateDistrict(
        district: Partial<District>,
        options: UpdateOptions<District>,
        schema: SchemaName,
    ) {
        return DistrictSchema.schema(schema).update(district, options);
    }

    public async deleteDistrict(
        options: UpdateOptions<District>,
        schema: SchemaName,
    ) {
        return DistrictSchema.schema(schema).update(
            { isDeleted: true },
            options,
        );
    }

    //CITY
    public async createCity(city: City, schema: SchemaName) {
        return CitySchema.schema(schema).create(city);
    }

    public async getCity(options: FindOptions<City>, schema: SchemaName) {
        return CitySchema.schema(schema).findOne(options);
    }

    public async getAllCities(options: FindOptions<City>, schema: SchemaName) {
        return CitySchema.schema(schema).findAndCountAll(options);
    }

    public async updateCity(
        city: Partial<City>,
        options: UpdateOptions<City>,
        schema: SchemaName,
    ) {
        return CitySchema.schema(schema).update(city, options);
    }

    public async deleteCity(options: UpdateOptions<City>, schema: SchemaName) {
        return CitySchema.schema(schema).update({ isDeleted: true }, options);
    }
}

export default new LocationRepo();
