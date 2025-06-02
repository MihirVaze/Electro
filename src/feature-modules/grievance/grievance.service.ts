import customerRepo from '../customer/customer.repo';
import { CUSTOMER_RESPONSES } from '../customer/customer.responses';
import { GRIEVANCE_RESPONSES } from './grievance.responses';
import { Grievance } from './grievance.type';
import grievanceRepo from './grievance.repo';
import { SchemaName } from '../../utility/umzug-migration';
import userLocationRepo from '../userLocation/userLocation.repo';
import roleServices from '../role/role.services';
import locationRepo from '../location/location.repo';
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

    async getGrievances(
        userId: string,
        roleIds: string[],
        limit: number,
        page: number,
        grievance: Partial<Grievance>,
        schema: SchemaName,
    ) {
        try {
            const offset = (page - 1) * limit;

            const where: WhereOptions<Grievance> = {
                isDeleted: false,
                ...grievance,
            };

            if (roleIds.includes(ROLE.CLIENT_ADMIN)) {
                return await grievanceRepo.getAll(
                    { where, limit, offset },
                    schema,
                );
            } else if (roleIds.includes(ROLE.STATE_MANAGER)) {
                return await grievanceRepo.getAll(
                    {
                        where: {
                            isDeleted: false,
                            ...grievance,
                        },
                        include: [
                            {
                                model: CitySchema.schema(schema),
                                as: 'city',
                                required: true,
                                where: { isDeleted: false },
                                include: [
                                    {
                                        model: DistrictSchema.schema(schema),
                                        as: 'district',
                                        required: true,
                                        where: { isDeleted: false },
                                        include: [
                                            {
                                                model: StateUserSchema.schema(
                                                    schema,
                                                ),
                                                as: 'stateUser',
                                                required: true,
                                                where: {
                                                    userId: userId,
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
            } else if (roleIds.includes(ROLE.DISTRICT_MANAGER)) {
                return await grievanceRepo.getAll(
                    {
                        where: {
                            isDeleted: false,
                            ...grievance,
                        },
                        include: [
                            {
                                model: CitySchema.schema(schema),
                                as: 'city',
                                where: { isDeleted: false },
                                include: [
                                    {
                                        model: DistrictSchema.schema(schema),
                                        as: 'district',
                                        required: true,
                                        where: { isDeleted: false },
                                        include: [
                                            {
                                                model: DistrictUserSchema.schema(
                                                    schema,
                                                ),
                                                as: 'districtUser',
                                                required: true,
                                                where: {
                                                    userId: userId,
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
            } else if (
                roleIds.includes(ROLE.CITY_MANAGER) ||
                roleIds.includes(ROLE.SERVICE_WORKER)
            ) {
                return await grievanceRepo.getAll(
                    {
                        where: {
                            isDeleted: false,
                            ...grievance,
                        },
                        include: [
                            {
                                model: CitySchema.schema(schema),
                                as: 'city',
                                required: true,
                                where: {
                                    isDeleted: false,
                                },
                                include: [
                                    {
                                        model: CityUserSchema.schema(schema),
                                        as: 'cityUser',
                                        required: true,
                                        where: {
                                            userId: userId,
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
        action: 'pick' | 'escalate',
        schema: SchemaName,
    ) {
        const grievance = await grievanceRepo.get({ where: { id } }, schema);
        if (!grievance) throw GRIEVANCE_RESPONSES.GRIEVANCE_NOT_FOUND;

        if (action === 'pick') {
            const assignedTo = await grievanceRepo.update(
                {
                    assignedTo: userId,
                    status: 'in-progress',
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
                },
                { where: { id } },
                schema,
            );
            if (!escalatedTo)
                throw GRIEVANCE_RESPONSES.GRIEVANCE_UPDATION_FAILED;
            return GRIEVANCE_RESPONSES.GRIEVANCE_ESCALATED;
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
}

export default new GrievanceService();
