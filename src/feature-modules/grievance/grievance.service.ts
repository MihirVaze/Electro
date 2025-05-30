import customerRepo from '../customer/customer.repo';
import { CUSTOMER_RESPONSES } from '../customer/customer.responses';
import { GRIEVANCE_RESPONSES } from './grievance.responses';
import { Grievance } from './grievance.type';
import grievanceRepo from './grievance.repo';
import { SchemaName } from '../../utility/umzug-migration';
import userLocationRepo from '../userLocation/userLocation.repo';
import roleServices from '../role/role.services';
import locationRepo from '../location/location.repo';
import { WhereOptions } from 'sequelize';

class GrievanceService {
    async raiseGrievance(
        userId: string,
        grievance: Grievance,
        schema: SchemaName,
    ) {
        const { grievanceTypeId } = grievance;
        if (!grievanceTypeId)
            throw GRIEVANCE_RESPONSES.GRIEVANCE_CREATION_FIELDS_MISSING;

        let { location, comments } = grievance;
        if (!comments) comments = 'none';

        const user = await customerRepo.get({ where: { userId } }, schema);
        if (!user) throw CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;

        location = user.dataValues.cityId;

        await grievanceRepo.create(
            {
                userId,
                grievanceTypeId,
                comments,
                location,
            },
            schema,
        );

        return GRIEVANCE_RESPONSES.GRIEVANCE_CREATED;
    }

    async getGrievance(
        userId: string,
        roleId: string[],
        limit: number,
        page: number,
        grievance: Partial<Grievance>,
        schema: SchemaName,
    ) {
        try {
            const roleNames = await Promise.all(
                roleId.map(
                    async (id) =>
                        (await roleServices.getRole({ id }, schema)).role,
                ),
            );

            const offset = (page - 1) * limit;

            const where: WhereOptions<Grievance> = {
                isDeleted: false,
                ...grievance,
            };

            if (grievance.status) {
                where.status = grievance.status;
            }

            if (roleNames.includes('client_manager')) {
                return grievanceRepo.getAll({ where, limit, offset }, schema);
            }

            const cities: string[] = [];

            if (roleNames.includes('state_manager')) {
                const userStates = await userLocationRepo.getAllUserState(
                    { where: { userId } },
                    schema,
                );
                const stateIds = userStates.rows.map(
                    (state) => state.dataValues.stateId,
                ); //statemanager
                for (const stateId of stateIds) {
                    const districts = await locationRepo.getAllDistricts(
                        { where: { stateId } },
                        schema,
                    );
                    const districtIds = districts.rows.map(
                        (district) => district.dataValues.id,
                    );
                    for (const districtId of districtIds) {
                        const getCities = await locationRepo.getAllCities(
                            { where: { districtId } },
                            schema,
                        );
                        const cityIds = getCities.rows.map(
                            (city) => city.dataValues.id,
                        );
                        for (const cityId of cityIds) {
                            if (!cityId) throw 'undefined';
                            cities.push(cityId);
                        }
                    }
                }
            } else if (roleNames.includes('district_manager')) {
                const userDistricts = await userLocationRepo.getAllUserDistrict(
                    { where: { userId } },
                    schema,
                );
                const districtIds = userDistricts.rows.map(
                    (district) => district.dataValues.districtId,
                );
                for (const districtId of districtIds) {
                    const getCities = await locationRepo.getAllCities(
                        { where: { districtId } },
                        schema,
                    );
                    const cityIds = getCities.rows.map(
                        (city) => city.dataValues.id,
                    );
                    for (const cityId of cityIds) {
                        if (!cityId) throw 'undefined';
                        cities.push(cityId);
                    }
                }
            } else if (
                roleNames.includes('city_manager') ||
                roleNames.includes('service_worker')
            ) {
                const userCities = await userLocationRepo.getAllUserCity(
                    { where: { userId } },
                    schema,
                );
                const cityIds = userCities.rows.map(
                    (city) => city.dataValues.cityId,
                );
                for (const cityId of cityIds) {
                    if (!cityId) throw 'undefined';
                    cities.push(cityId);
                }
            }

            where.location = cities;
            return grievanceRepo.getAll({ where, limit, offset }, schema);
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
}
