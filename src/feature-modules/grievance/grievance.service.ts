import customerRepo from '../customer/customer.repo';
import { CUSTOMER_RESPONSES } from '../customer/customer.responses';
import { GRIEVANCE_RESPONSES } from './grievance.responses';
import { Grievance } from './grievance.type';
import grievanceRepo from './grievance.repo';
import { SchemaName } from '../../utility/umzug-migration';
import userLocationRepo from '../userLocation/userLocation.repo';
import roleServices from '../role/role.services';
import locationRepo from '../location/location.repo';
import { Op, WhereOptions } from 'sequelize';
import { DistrictSchema, StateSchema } from '../location/location.schema';
import {
    CityUserSchema,
    DistrictUserSchema,
    StateUserSchema,
} from '../userLocation/userLocation.schema';

class GrievanceService {
    async raiseGrievance(
        userId: string,
        grievance: Grievance,
        schema: SchemaName,
    ) {
        const { grievanceTypeId } = grievance;
        if (!grievanceTypeId)
            throw GRIEVANCE_RESPONSES.GRIEVANCE_CREATION_FIELDS_MISSING;

        let { comments } = grievance;
        if (!comments) comments = 'none';

        const user = await customerRepo.get({ where: { userId } }, schema);
        if (!user) throw CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;

        const location = user.dataValues.cityId;

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

    // async getGrievance(
    //     userId: string,
    //     roleIds: string[],
    //     limit: number,
    //     page: number,
    //     grievance: Partial<Grievance>,
    //     schema: SchemaName,
    // ) {
    //     try {
    //         const offset = (page - 1) * limit;

    //         const where: WhereOptions<Grievance> = {
    //             isDeleted: false,
    //             ...grievance,
    //         };

    //         if (roleIds.includes(ROLE.CLIENT_MANAGER)) {
    //             return grievanceRepo.getAll({ where, limit, offset }, schema);
    //         };

    // const cities: string[] = [];

    // if (roleNames.includes('state_manager')) {
    //     const userStates = await userLocationRepo.getAllUserState(
    //         { where: { userId } },
    //         schema,
    //     );
    //     const stateIds = userStates.rows.map(
    //         (state) => state.dataValues.stateId,
    //     );

    //     const cityIds = await locationRepo.getAllCities(
    //         {
    //             include: [
    //                 {
    //                     model: DistrictSchema,
    //                     attributes: [],
    //                     where: {
    //                         stateId: {
    //                             [Op.in]: stateIds,
    //                         },
    //                     },
    //                 },
    //             ],
    //             attributes: ['id'],
    //         },
    //         schema,
    //     );

    //     for (const cityId of cityIds.rows) {
    //         if (!cityId.dataValues.id) throw 'id invalid';
    //         cities.push(cityId.dataValues.id);
    //     }
    // } else if (roleNames.includes('district_manager')) {
    //     const userDistricts = await userLocationRepo.getAllUserDistrict(
    //         { where: { userId } },
    //         schema,
    //     );
    //     const districtIds = userDistricts.rows.map(
    //         (district) => district.dataValues.districtId,
    //     );

    //     const cityIds = await locationRepo.getAllCities(
    //         {
    //             where: {
    //                 districtId: {
    //                     [Op.in]: districtIds,
    //                 },
    //             },
    //             attributes: ['id'],
    //         },
    //         schema,
    //     );

    //     for (const cityId of cityIds.rows) {
    //         if (!cityId.dataValues.id) throw 'id invalid';
    //         cities.push(cityId.dataValues.id);
    //     }
    // } else if (
    //     roleNames.includes('city_manager') ||
    //     roleNames.includes('service_worker')
    // ) {
    //     const cityIds = await userLocationRepo.getAllUserCity(
    //         {
    //             where: {
    //                 userId,
    //             },
    //             attributes: ['id'],
    //         },
    //         schema,
    //     );

    //     for (const cityId of cityIds.rows) {
    //         if (!cityId.dataValues.id) throw 'id invalid';
    //         cities.push(cityId.dataValues.id);
    //     }
    // }

    //         const cities: string[] = [];
    //         StateUserSchema.findAll({
    //             where: {
    //                 userId,
    //                 attribute: ['stateId']
    //             },
    //             include: [
    //                 {
    //                     model: StateSchema,
    //                         include: [{
    //                                 model: DistrictSchema,
    //                                 include: [{
    //                                     model: CityUserSchema,
    //                                 }]
    //                             }]
    //                         }]
    //                 })

    //         CityUserSchema.findAll({
    //             where: {
    //                 userId,
    //             }
    //         })

    //         //where.location = cities;
    //         where.location = { [Op.in]: cities };
    //         return await grievanceRepo.getAll({ where, limit, offset }, schema);
    //     } catch (e) {
    //         console.dir(e);
    //         throw e;
    //     }
    // }

    async assignOrEscalateGrievance(
        userId: string,
        roleId: string[],
        grievanceId: string,
        action: 'pick' | 'escalate',
        schema: SchemaName,
    ) {
        const grievance = await grievanceRepo.get(
            { where: { id: grievanceId } },
            schema,
        );
        if (!grievance) throw GRIEVANCE_RESPONSES.GRIEVANCE_NOT_FOUND;

        const roleNames = await Promise.all(
            roleId.map(
                async (id) => (await roleServices.getRole({ id }, schema)).role,
            ),
        );

        if (action === 'pick') {
            await grievanceRepo.update(
                {
                    assignedTo: userId,
                    status: 'in-progress',
                },
                { where: { id: grievanceId } },
                schema,
            );

            return GRIEVANCE_RESPONSES.GRIEVANCE_ASSIGNED;
        }

        if (action === 'escalate') {
            let escalateTo = '';
            if (roleNames.includes('service_worker'))
                escalateTo = 'city_manager';
            else if (roleNames.includes('city_manager'))
                escalateTo = 'district_manager';
            else if (roleNames.includes('district_manager'))
                escalateTo = 'state_manager';
            else if (roleNames.includes('state_manager'))
                escalateTo = 'client_manager';
            else throw GRIEVANCE_RESPONSES.GRIEVANCE_ESCALATION_NOT_ALLOWED;

            await grievanceRepo.update(
                {
                    escalatedTo: escalateTo,
                    status: 'pending',
                },
                { where: { id: grievanceId } },
                schema,
            );
            return GRIEVANCE_RESPONSES.GRIEVANCE_ESCALATED;
        }
    }
}

export default new GrievanceService();
