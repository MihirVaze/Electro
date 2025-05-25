import locationRepo from './location.repo';
import { LOCATION_RESPONSES } from './location.responses';
import { City, District, State } from './location.type';

class LocationServices {
  // STATE
  async createState(state: State) {
    try {
      const result = await locationRepo.createState({ ...state });
      if (result) return LOCATION_RESPONSES.STATE_CREATED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async getState(stateId: string) {
    try {
      const result = await locationRepo.getState({
        where: {
          id: stateId,
        },
        attributes: ['id', 'name'],
      });
      if (!result) throw LOCATION_RESPONSES.STATE_NOT_FOUND;
      return result.dataValues;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async getAllStates() {
    try {
      const result = await locationRepo.getAllStates({ where: { isDeleted: false } });
      return result;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async updateState(stateId: string, stateField: Partial<State>) {
    try {
      if (!stateId) throw LOCATION_RESPONSES.STATE_ID_REQURED;
      const result = await locationRepo.updateState(stateField, { where: { id: stateId } });
      if (!result[0]) throw LOCATION_RESPONSES.STATE_UPDATION_FAILED;
      return LOCATION_RESPONSES.STATE_UPDATED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async deleteState(stateId: string) {
    try {
      if (!stateId) throw LOCATION_RESPONSES.STATE_ID_REQURED;
      const result = await locationRepo.deleteState({ where: { id: stateId } });
      if (!result[0]) throw LOCATION_RESPONSES.STATE_DELETION_FAILED;
      return LOCATION_RESPONSES.STATE_DELETED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  // DISTRICT
  async createDistrict(district: District) {
    try {
      const result = await locationRepo.createDistrict(district);
      if (result) return LOCATION_RESPONSES.DISTRICT_CREATED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async getDistrict(districtId: string) {
    try {
      const result = await locationRepo.getDistrict({
        where: {
          id: districtId,
        },
        attributes: ['id', 'name'],
      });
      if (!result) throw LOCATION_RESPONSES.DISTRICT_NOT_FOUND;
      return result.dataValues;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async getAllDistricts() {
    try {
      const result = await locationRepo.getAllDistricts({ where: { isDeleted: false } });
      return result;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async updateDistrict(districtId: string, districtField: Partial<District>) {
    try {
      if (!districtId) throw LOCATION_RESPONSES.DISTRICT_ID_REQURED;
      const result = await locationRepo.updateDistrict(districtField, { where: { id: districtId } });
      if (!result[0]) throw LOCATION_RESPONSES.DISTRICT_UPDATION_FAILED;
      return LOCATION_RESPONSES.DISTRICT_UPDATED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async deleteDistrict(districtId: string) {
    try {
      if (!districtId) throw LOCATION_RESPONSES.DISTRICT_ID_REQURED;
      const result = await locationRepo.deleteDistrict({ where: { id: districtId } });
      if (!result[0]) throw LOCATION_RESPONSES.DISTRICT_DELETION_FAILED;
      return LOCATION_RESPONSES.DISTRICT_DELETED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  //CITY
  async createCity(city: City) {
    try {
      const result = await locationRepo.createCity(city);
      if (result) return LOCATION_RESPONSES.CITY_CREATED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async getCity(cityId: string) {
    try {
      const result = await locationRepo.getCity({
        where: {
          id: cityId,
        },
        attributes: ['id', 'name'],
      });
      if (!result) throw LOCATION_RESPONSES.CITY_NOT_FOUND;
      return result.dataValues;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async getAllCitys() {
    try {
      const result = await locationRepo.getAllCitys({ where: { isDeleted: false } });
      return result;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async updateCity(cityId: string, cityField: Partial<City>) {
    try {
      if (!cityId) throw LOCATION_RESPONSES.CITY_ID_REQURED;
      const result = await locationRepo.updateCity(cityField, { where: { id: cityId } });
      if (!result[0]) throw LOCATION_RESPONSES.CITY_UPDATION_FAILED;
      return LOCATION_RESPONSES.CITY_UPDATED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }

  async deleteCity(cityId: string) {
    try {
      if (!cityId) throw LOCATION_RESPONSES.CITY_ID_REQURED;
      const result = await locationRepo.deleteCity({ where: { id: cityId } });
      if (!result[0]) throw LOCATION_RESPONSES.CITY_DELETION_FAILED;
      return LOCATION_RESPONSES.CITY_DELETED;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  }
}

export default new LocationServices();
