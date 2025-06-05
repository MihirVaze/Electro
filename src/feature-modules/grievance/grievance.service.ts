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
import { Payload } from '../auth/auth.type';
import { City, District, State } from '../location/location.type';
import userLocationService from '../userLocation/userLocation.service';
import { EXCLUDED_KEYS } from '../../utility/base-schema';
import locationService from '../location/location.service';

class GrievanceService {
    async raiseGrievance(
        userId: string,
        grievance: Grievance,
        schema: SchemaName,
    ) {
        try {
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
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async searchStateGrievances(
        userId: string,
        stateWhere: WhereOptions<State>,
        limit: number,
        offset: number,
        schema: SchemaName,
    ) {
        try {
            return await grievanceRepo.getAll(
                {
                    where: { isDeleted: false },
                    attributes: {
                        exclude: EXCLUDED_KEYS,
                    },
                    include: [
                        {
                            model: CitySchema.schema(schema),
                            as: 'city',
                            required: true,
                            where: { isDeleted: false },
                            attributes: {
                                exclude: [
                                    ...EXCLUDED_KEYS,
                                    'name',
                                    'createdAt',
                                    'updatedAt',
                                ],
                            },
                            include: [
                                {
                                    model: DistrictSchema.schema(schema),
                                    as: 'district',
                                    required: true,
                                    where: { isDeleted: false },
                                    attributes: {
                                        exclude: [
                                            ...EXCLUDED_KEYS,
                                            'name',
                                            'createdAt',
                                            'updatedAt',
                                        ],
                                    },
                                    include: [
                                        {
                                            model: StateSchema.schema(schema),
                                            as: 'state',
                                            required: true,
                                            where: stateWhere,
                                            attributes: {
                                                exclude: [
                                                    ...EXCLUDED_KEYS,
                                                    'name',
                                                    'createdAt',
                                                    'updatedAt',
                                                ],
                                            },
                                            include: [
                                                {
                                                    model: StateUserSchema.schema(
                                                        schema,
                                                    ),
                                                    as: 'stateUser',
                                                    required: true,
                                                    attributes: {
                                                        exclude: [
                                                            ...EXCLUDED_KEYS,
                                                            'userId',
                                                            'createdAt',
                                                            'updatedAt',
                                                        ],
                                                    },
                                                    where: {
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

    async searchDistrictGrievances(
        userId: string,
        districtWhere: WhereOptions<District>,
        limit: number,
        offset: number,
        schema: SchemaName,
    ) {
        try {
            return await grievanceRepo.getAll(
                {
                    where: { isDeleted: false },
                    attributes: {
                        exclude: EXCLUDED_KEYS,
                    },
                    include: [
                        {
                            model: CitySchema.schema(schema),
                            as: 'city',
                            where: { isDeleted: false },
                            attributes: {
                                exclude: [
                                    ...EXCLUDED_KEYS,
                                    'name',
                                    'createdAt',
                                    'updatedAt',
                                ],
                            },
                            include: [
                                {
                                    model: DistrictSchema.schema(schema),
                                    as: 'district',
                                    required: true,
                                    where: districtWhere,
                                    attributes: {
                                        exclude: [
                                            ...EXCLUDED_KEYS,
                                            'name',
                                            'createdAt',
                                            'updatedAt',
                                        ],
                                    },
                                    include: [
                                        {
                                            model: DistrictUserSchema.schema(
                                                schema,
                                            ),
                                            as: 'districtUser',
                                            required: true,
                                            attributes: {
                                                exclude: [
                                                    ...EXCLUDED_KEYS,
                                                    'userId',
                                                    'createdAt',
                                                    'updatedAt',
                                                ],
                                            },
                                            where: {
                                                isDeleted: false,
                                            },
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

    async searchCityGrievances(
        userId: string,
        cityWhere: WhereOptions<City>,
        limit: number,
        offset: number,
        schema: SchemaName,
    ) {
        try {
            return await grievanceRepo.getAll(
                {
                    where: { isDeleted: false },
                    attributes: {
                        exclude: EXCLUDED_KEYS,
                    },
                    include: [
                        {
                            model: CitySchema.schema(schema),
                            as: 'city',
                            required: true,
                            attributes: {
                                exclude: [
                                    ...EXCLUDED_KEYS,
                                    'name',
                                    'createdAt',
                                    'updatedAt',
                                ],
                            },
                            where: cityWhere,
                            include: [
                                {
                                    model: CityUserSchema.schema(schema),
                                    as: 'cityUser',
                                    required: true,
                                    attributes: {
                                        exclude: [
                                            ...EXCLUDED_KEYS,
                                            'userId',
                                            'createdAt',
                                            'updatedAt',
                                        ],
                                    },
                                    where: {
                                        isDeleted: false,
                                    },
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

    async getGrievances(payload: Payload, options: GetGrievance) {
        try {
            const { schema, id: userId, roleIds } = payload;
            const {
                limit,
                page,
                locationType: GetLocType,
                searchTerm,
            } = options;

            const offset = (page - 1) * limit;

            let stateWhere: WhereOptions<State> = { isDeleted: false };
            let districtWhere: WhereOptions<District> = { isDeleted: false };
            let cityWhere: WhereOptions<City> = { isDeleted: false };

            switch (GetLocType) {
                case 'state':
                    let stateIds: string[] | undefined;

                    if (roleIds.includes(ROLE.STATE_MANAGER))
                        stateIds = await userLocationService.GetUserLocationIds(
                            schema,
                            userId,
                            'state',
                            GetLocType,
                        );
                    else if (roleIds.includes(ROLE.CLIENT_ADMIN)) {
                        stateIds = undefined; // NO NEED FOR A WHERE IF IT IS A CLIENT ADMIN
                        if (searchTerm)
                            stateWhere.name = { [Op.iLike]: `%${searchTerm}%` };
                    } else throw "CAN'T SEARCH BY STATE";

                    if (stateIds) {
                        stateWhere.id = {
                            [Op.in]: stateIds,
                        };
                        if (searchTerm)
                            stateWhere.name = { [Op.iLike]: `%${searchTerm}%` };
                    }
                    console.log(stateWhere);

                    return await this.searchStateGrievances(
                        userId,
                        stateWhere,
                        limit,
                        offset,
                        schema,
                    );

                case 'district':
                    let districtIds: string[] | undefined;

                    if (roleIds.includes(ROLE.DISTRICT_MANAGER))
                        districtIds =
                            await userLocationService.GetUserLocationIds(
                                schema,
                                userId,
                                'district',
                                GetLocType,
                            );
                    else if (roleIds.includes(ROLE.STATE_MANAGER))
                        districtIds =
                            await userLocationService.GetUserLocationIds(
                                schema,
                                userId,
                                'state',
                                GetLocType,
                            );
                    else if (roleIds.includes(ROLE.CLIENT_ADMIN)) {
                        districtIds = undefined; // NO NEED FOR A WHERE IF IT IS A CLIENT ADMIN
                        if (searchTerm)
                            districtWhere.name = {
                                [Op.iLike]: `%${searchTerm}%`,
                            };
                    } else throw "CAN'T SEARCH BY DISTRICT";

                    if (districtIds) {
                        districtWhere.id = {
                            [Op.in]: districtIds,
                        };
                        if (searchTerm)
                            districtWhere.name = {
                                [Op.iLike]: `%${searchTerm}%`,
                            };
                    }
                    console.log(districtWhere);

                    return await this.searchDistrictGrievances(
                        userId,
                        districtWhere,
                        limit,
                        offset,
                        schema,
                    );

                case 'city':
                    let cityIds: string[] | undefined;

                    if (
                        roleIds.some((e) =>
                            [ROLE.CITY_MANAGER, ROLE.SERVICE_WORKER].includes(
                                e,
                            ),
                        )
                    )
                        cityIds = await userLocationService.GetUserLocationIds(
                            schema,
                            userId,
                            'city',
                            GetLocType,
                        );
                    else if (roleIds.includes(ROLE.DISTRICT_MANAGER))
                        cityIds = await userLocationService.GetUserLocationIds(
                            schema,
                            userId,
                            'district',
                            GetLocType,
                        );
                    else if (roleIds.includes(ROLE.STATE_MANAGER))
                        cityIds = await userLocationService.GetUserLocationIds(
                            schema,
                            userId,
                            'state',
                            GetLocType,
                        );
                    else if (roleIds.includes(ROLE.CLIENT_ADMIN)) {
                        cityIds = undefined; // NO NEED FOR A WHERE IF IT IS A CLIENT ADMIN
                        if (searchTerm)
                            cityWhere.name = {
                                [Op.iLike]: `%${searchTerm}%`,
                            };
                    } else throw "CAN'T SEARCH BY CITY";

                    if (cityIds) {
                        cityWhere.id = {
                            [Op.in]: cityIds,
                        };
                        if (searchTerm)
                            cityWhere.name = {
                                [Op.iLike]: `%${searchTerm}%`,
                            };
                    }
                    console.log(cityWhere);

                    return await this.searchCityGrievances(
                        userId,
                        cityWhere,
                        limit,
                        offset,
                        schema,
                    );

                default:
                    throw 'INVALID LOCATION TYPE';
            }
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
        try {
            const grievance = await grievanceRepo.get(
                { where: { id } },
                schema,
            );
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
                if (!resolved)
                    throw GRIEVANCE_RESPONSES.GRIEVANCE_UPDATION_FAILED;
                return GRIEVANCE_RESPONSES.GRIEVANCE_RESOLVED;
            }
        } catch (e) {
            console.dir(e);
            throw e;
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
