import { SchemaName } from '../../utility/umzug-migration';
import { LocationType } from '../userLocation/userLocation.type';
import locationRepo from './location.repo';
import { LOCATION_RESPONSES } from './location.responses';
import { City, District, State } from './location.type';

class LocationServices {
    // STATE
    async createState(state: State, schema: SchemaName) {
        try {
            const result = await locationRepo.createState({ ...state }, schema);
            if (result) return LOCATION_RESPONSES.STATE_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getState(stateId: string, schema: SchemaName) {
        try {
            const result = await locationRepo.getState(
                {
                    where: {
                        id: stateId,
                    },
                    attributes: ['id', 'name'],
                },
                schema,
            );
            if (!result) throw LOCATION_RESPONSES.STATE_NOT_FOUND;
            return result.dataValues;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllStates(schema: SchemaName) {
        try {
            const result = await locationRepo.getAllStates(
                {
                    where: { isDeleted: false },
                },
                schema,
            );
            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllStateIds(schema: SchemaName) {
        try {
            return (await this.getAllStates(schema)).rows.reduce(
                (acc: string[], e) => {
                    const id = e.dataValues.id;
                    if (id) acc.push(id);
                    return acc;
                },
                [],
            );
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateState(
        stateId: string,
        stateField: Partial<State>,
        schema: SchemaName,
    ) {
        try {
            if (!stateId) throw LOCATION_RESPONSES.STATE_ID_REQURED;
            const result = await locationRepo.updateState(
                stateField,
                {
                    where: { id: stateId },
                },
                schema,
            );
            if (!result[0]) throw LOCATION_RESPONSES.STATE_UPDATION_FAILED;
            return LOCATION_RESPONSES.STATE_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteState(stateId: string, schema: SchemaName) {
        try {
            if (!stateId) throw LOCATION_RESPONSES.STATE_ID_REQURED;
            const result = await locationRepo.deleteState(
                {
                    where: { id: stateId },
                },
                schema,
            );
            if (!result[0]) throw LOCATION_RESPONSES.STATE_DELETION_FAILED;
            return LOCATION_RESPONSES.STATE_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    // DISTRICT
    async createDistrict(district: District, schema: SchemaName) {
        try {
            const result = await locationRepo.createDistrict(district, schema);
            if (result) return LOCATION_RESPONSES.DISTRICT_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getDistrict(districtId: string, schema: SchemaName) {
        try {
            const result = await locationRepo.getDistrict(
                {
                    where: {
                        id: districtId,
                    },
                    attributes: ['id', 'name'],
                },
                schema,
            );
            if (!result) throw LOCATION_RESPONSES.DISTRICT_NOT_FOUND;
            return result.dataValues;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllDistricts(schema: SchemaName) {
        try {
            const result = await locationRepo.getAllDistricts(
                {
                    where: { isDeleted: false },
                },
                schema,
            );
            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllDistrictIds(schema: SchemaName) {
        try {
            return (await this.getAllDistricts(schema)).rows.reduce(
                (acc: string[], e) => {
                    const id = e.dataValues.id;
                    if (id) acc.push(id);
                    return acc;
                },
                [],
            );
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateDistrict(
        districtId: string,
        districtField: Partial<District>,
        schema: SchemaName,
    ) {
        try {
            if (!districtId) throw LOCATION_RESPONSES.DISTRICT_ID_REQURED;
            const result = await locationRepo.updateDistrict(
                districtField,
                {
                    where: { id: districtId },
                },
                schema,
            );
            if (!result[0]) throw LOCATION_RESPONSES.DISTRICT_UPDATION_FAILED;
            return LOCATION_RESPONSES.DISTRICT_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteDistrict(districtId: string, schema: SchemaName) {
        try {
            if (!districtId) throw LOCATION_RESPONSES.DISTRICT_ID_REQURED;
            const result = await locationRepo.deleteDistrict(
                {
                    where: { id: districtId },
                },
                schema,
            );
            if (!result[0]) throw LOCATION_RESPONSES.DISTRICT_DELETION_FAILED;
            return LOCATION_RESPONSES.DISTRICT_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    //CITY
    async createCity(city: City, schema: SchemaName) {
        try {
            const result = await locationRepo.createCity(city, schema);
            if (result) return LOCATION_RESPONSES.CITY_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getCity(cityId: string, schema: SchemaName) {
        try {
            const result = await locationRepo.getCity(
                {
                    where: {
                        id: cityId,
                    },
                    attributes: ['id', 'name'],
                },
                schema,
            );
            if (!result) throw LOCATION_RESPONSES.CITY_NOT_FOUND;
            return result.dataValues;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllCitys(schema: SchemaName) {
        try {
            const result = await locationRepo.getAllCities(
                {
                    where: { isDeleted: false },
                },
                schema,
            );
            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllCityIds(schema: SchemaName) {
        try {
            return (await this.getAllCitys(schema)).rows.reduce(
                (acc: string[], e) => {
                    const id = e.dataValues.id;
                    if (id) acc.push(id);
                    return acc;
                },
                [],
            );
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateCity(
        cityId: string,
        cityField: Partial<City>,
        schema: SchemaName,
    ) {
        try {
            if (!cityId) throw LOCATION_RESPONSES.CITY_ID_REQURED;
            const result = await locationRepo.updateCity(
                cityField,
                {
                    where: { id: cityId },
                },
                schema,
            );
            if (!result[0]) throw LOCATION_RESPONSES.CITY_UPDATION_FAILED;
            return LOCATION_RESPONSES.CITY_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteCity(cityId: string, schema: SchemaName) {
        try {
            if (!cityId) throw LOCATION_RESPONSES.CITY_ID_REQURED;
            const result = await locationRepo.deleteCity(
                {
                    where: { id: cityId },
                },
                schema,
            );
            if (!result[0]) throw LOCATION_RESPONSES.CITY_DELETION_FAILED;
            return LOCATION_RESPONSES.CITY_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllLocationIds(schema: SchemaName, locationType: LocationType) {
        try {
            switch (locationType) {
                case 'state':
                    return await this.getAllStateIds(schema);

                case 'district':
                    return await this.getAllDistrictIds(schema);

                case 'city':
                    return await this.getAllCityIds(schema);
            }
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
}

export default new LocationServices();
