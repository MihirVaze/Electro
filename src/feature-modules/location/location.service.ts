import locationRepo from './location.repo';
import { LOCATION_RESPONSES } from './location.responses';
import { City, District, State } from './location.type';

class LocationServices {
    // STATE
    async createState(state: State, schema: string) {
        try {
            const result = await locationRepo.createState({ ...state }, schema);
            if (result) return LOCATION_RESPONSES.STATE_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getState(stateId: string, schema: string) {
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

    async getAllStates(schema: string) {
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

    async updateState(
        stateId: string,
        stateField: Partial<State>,
        schema: string,
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

    async deleteState(stateId: string, schema: string) {
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
    async createDistrict(district: District, schema: string) {
        try {
            const result = await locationRepo.createDistrict(district, schema);
            if (result) return LOCATION_RESPONSES.DISTRICT_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getDistrict(districtId: string, schema: string) {
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

    async getAllDistricts(schema: string) {
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

    async updateDistrict(
        districtId: string,
        districtField: Partial<District>,
        schema: string,
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

    async deleteDistrict(districtId: string, schema: string) {
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
    async createCity(city: City, schema: string) {
        try {
            const result = await locationRepo.createCity(city, schema);
            if (result) return LOCATION_RESPONSES.CITY_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getCity(cityId: string, schema: string) {
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

    async getAllCitys(schema: string) {
        try {
            const result = await locationRepo.getAllCitys(
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

    async updateCity(cityId: string, cityField: Partial<City>, schema: string) {
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

    async deleteCity(cityId: string, schema: string) {
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
}

export default new LocationServices();
