import customerRepo from '../customer/customer.repo';
import { CUSTOMER_RESPONSES } from '../customer/customer.responses';
import { GRIEVANCE_RESPONSES } from './grievance.responses';
import { GetGrievance, Grievance } from './grievance.type';
import grievanceRepo from './grievance.repo';
import { SchemaName } from '../../utility/umzug-migration';
import { FindOptions, Op, WhereOptions } from 'sequelize';
import {
    CitySchema,
    DistrictSchema,
    StateSchema,
} from '../location/location.schema';
import {
    CityUserSchema,
    DistrictUserSchema,
    StateUserSchema,
} from '../userLocation/userLocation.schema';
import { ROLE } from '../role/role.data';
import userLocationRepo from '../userLocation/userLocation.repo';
import { Payload } from '../auth/auth.type';
import { City, District, State } from '../location/location.type';
import userLocationService from '../userLocation/userLocation.service';

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

        const user = await customerRepo.getCustomer(
            { where: { userId } },
            schema,
        );
        if (!user) throw CUSTOMER_RESPONSES.CUSTOMER_NOT_FOUND;

        const location = user.dataValues.cityId;

        await grievanceRepo.create(
            {
                userId,
                grievanceTypeId,
                comments,
                location,
                createdBy: userId,
            },
            schema,
        );

        return GRIEVANCE_RESPONSES.GRIEVANCE_CREATED;
    }

    async getGrievances(payload: Payload, options: GetGrievance) {
        try {
            const { schema, id: userId, roleIds } = payload;
            const { limit, page, locationType, searchTerm } = options;

            const offset = (page - 1) * limit;

            let stateWhere: WhereOptions<State> = { isDeleted: false };
            let districtWhere: WhereOptions<District> = { isDeleted: false };
            let cityWhere: WhereOptions<City> = { isDeleted: false };

            switch (locationType) {
                case 'state':
                    if (
                        roleIds.includes(
                            ROLE.CLIENT_ADMIN || ROLE.STATE_MANAGER,
                        )
                    ) {
                        stateWhere.id = {
                            [Op.in]:
                                await userLocationService.GetUserLocationIds(
                                    schema,
                                    userId,
                                    locationType,
                                ),
                        };
                        if (searchTerm)
                            stateWhere.name = { [Op.iLike]: `%${searchTerm}%` };
                    }
                    break;

                case 'district':
                    if (
                        roleIds.includes(
                            ROLE.CLIENT_ADMIN ||
                                ROLE.STATE_MANAGER ||
                                ROLE.DISTRICT_MANAGER,
                        )
                    ) {
                        districtWhere.id = {
                            [Op.in]:
                                await userLocationService.GetUserLocationIds(
                                    schema,
                                    userId,
                                    locationType,
                                ),
                        };
                        if (searchTerm)
                            districtWhere.name = {
                                [Op.iLike]: `%${searchTerm}%`,
                            };
                    }
                    break;

                case 'city':
                    if (
                        roleIds.includes(
                            ROLE.CLIENT_ADMIN ||
                                ROLE.STATE_MANAGER ||
                                ROLE.DISTRICT_MANAGER ||
                                ROLE.CITY_MANAGER ||
                                ROLE.SERVICE_WORKER,
                        )
                    ) {
                        cityWhere.id = {
                            [Op.in]:
                                await userLocationService.GetUserLocationIds(
                                    schema,
                                    userId,
                                    locationType,
                                ),
                        };
                        if (searchTerm)
                            cityWhere.name = { [Op.iLike]: `%${searchTerm}%` };
                    }
                    break;

                default:
                    throw 'INVALID LOCATION TYPE';
            }

            return await grievanceRepo.getAll(
                {
                    where: {
                        isDeleted: false,
                        status: options.status || 'pending',
                    },
                    include: [
                        {
                            model: CitySchema.schema(schema),
                            as: 'city',
                            attributes: [],
                            required: true,
                            where: cityWhere,
                            include: [
                                {
                                    model: DistrictSchema.schema(schema),
                                    as: 'district',
                                    attributes: [],
                                    required: true,
                                    where: districtWhere,
                                    include: [
                                        {
                                            model: StateSchema.schema(schema),
                                            as: 'state',
                                            attributes: [],
                                            required: true,
                                            where: stateWhere,
                                            include: [
                                                {
                                                    model: StateUserSchema.schema(
                                                        schema,
                                                    ),
                                                    as: 'stateUser',
                                                    attributes: [],
                                                    required: true,
                                                    where: {
                                                        userId,
                                                        isDeleted: false,
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    limit,
                    offset,
                },
                schema,
            );
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
    async assignOrEscalateGrievance(
        userId: string,
        roleId: string[],
        id: string,
        action: 'pick' | 'escalate' | 'resolved',
        schema: SchemaName,
    ) {
        const grievance = await grievanceRepo.get({ where: { id } }, schema);
        if (!grievance) throw GRIEVANCE_RESPONSES.GRIEVANCE_NOT_FOUND;

        if (action === 'pick') {
            const assignedTo = await grievanceRepo.update(
                {
                    assignedTo: userId,
                    status: 'in-progress',
                    updatedBy: userId,
                },
                { where: { id } },
                schema,
            );
            if (!assignedTo)
                throw GRIEVANCE_RESPONSES.GRIEVANCE_UPDATION_FAILED;

            return GRIEVANCE_RESPONSES.GRIEVANCE_ASSIGNED;
        }

        if (action === 'escalate') {
            let escalateTo = '';
            if (roleId.includes(ROLE.SERVICE_WORKER))
                escalateTo = ROLE.CITY_MANAGER;
            else if (roleId.includes(ROLE.CITY_MANAGER))
                escalateTo = ROLE.DISTRICT_MANAGER;
            else if (roleId.includes(ROLE.DISTRICT_MANAGER))
                escalateTo = ROLE.STATE_MANAGER;
            else if (roleId.includes(ROLE.STATE_MANAGER))
                escalateTo = ROLE.CLIENT_ADMIN;
            else throw GRIEVANCE_RESPONSES.GRIEVANCE_ESCALATION_NOT_ALLOWED;

            const escalatedTo = await grievanceRepo.update(
                {
                    escalatedTo: escalateTo,
                    status: 'pending',
                    updatedBy: userId,
                },
                { where: { id } },
                schema,
            );
            if (!escalatedTo)
                throw GRIEVANCE_RESPONSES.GRIEVANCE_UPDATION_FAILED;
            return GRIEVANCE_RESPONSES.GRIEVANCE_ESCALATED;
        }

        if (action === 'resolved') {
            const resolved = await grievanceRepo.update(
                {
                    status: 'resolved',
                    updatedBy: userId,
                },
                { where: { id } },
                schema,
            );
            if (!resolved) throw GRIEVANCE_RESPONSES.GRIEVANCE_UPDATION_FAILED;
            return GRIEVANCE_RESPONSES.GRIEVANCE_RESOLVED;
        }
    }

    async GrievanceReport(schema: SchemaName, options: FindOptions<Grievance>) {
        try {
            const results = await grievanceRepo.getAll(options, schema);
            return results;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async DeleteGrievance(userId: string, id: string, schema: SchemaName) {
        try {
            await grievanceRepo.delete(
                userId,
                {
                    where: { id },
                },
                schema,
            );
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
}

export default new GrievanceService();
