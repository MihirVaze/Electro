import { Op } from 'sequelize';
import grievanceTypeRepo from './grievanceType.repo';
import { GRIEVANCE_TYPE_RESPONSES } from './grievanceType.responses';
import { GrievanceType } from './grievanceType.type';

class GrievanceTypeService {
    async createGrievanceType(grievanceType: GrievanceType, schema: string) {
        try {
            const result = await grievanceTypeRepo.create(
                grievanceType,
                schema,
            );
            if (!result)
                throw GRIEVANCE_TYPE_RESPONSES.GRIEVANCE_TYPE_CREATION_FAILED;
            return GRIEVANCE_TYPE_RESPONSES.GRIEVANCE_TYPE_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllGrievanceType(
        limit: number,
        page: number,
        grievanceType: Partial<GrievanceType>,
        schema: string,
    ) {
        try {
            const { name } = grievanceType;

            const where: any = { isDeleted: false };

            if (name) {
                where.name = { [Op.substring]: name };
            }

            const offset = (page - 1) * limit;

            const result = await grievanceTypeRepo.getAll(
                {
                    where,
                    limit,
                    offset,
                },
                schema,
            );

            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async findOneGrievanceType(
        grievanceType: Partial<GrievanceType>,
        schema: string,
    ) {
        try {
            const result = await grievanceTypeRepo.get(
                {
                    where: { id: grievanceType.id, isDeleted: false },
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                },
                schema,
            );

            if (!result)
                throw GRIEVANCE_TYPE_RESPONSES.GRIEVANCE_TYPE_NOT_FOUND;

            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateGrievanceType(
        id: string,
        grievanceType: Partial<GrievanceType>,
        schema: string,
    ) {
        try {
            if (!id) throw 'ID not found';
            const result = await grievanceTypeRepo.update(
                grievanceType,
                { where: { id } },
                schema,
            );
            if (!result)
                GRIEVANCE_TYPE_RESPONSES.GRIEVANCE_TYPE_UPDATION_FAILED;
            return GRIEVANCE_TYPE_RESPONSES.GRIEVANCE_TYPE_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteGrievanceType(id: string, schema: string) {
        try {
            const result = await grievanceTypeRepo.delete(
                { where: { id } },
                schema,
            );
            if (!result[0])
                throw GRIEVANCE_TYPE_RESPONSES.GRIEVANCE_TYPE_DELETION_FAILED;
            return GRIEVANCE_TYPE_RESPONSES.GRIEVANCE_TYPE_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
}

export default new GrievanceTypeService();

// SELECT city.id
// FROM user_locations AS ul
// JOIN states AS s ON s.id = ul.state_id -- for state_manager
// JOIN districts AS d ON d.state_id = s.id
// JOIN cities AS city ON city.district_id = d.id
// WHERE ul.user_id = :userId;

// async function getAllUserCityByRole(userId: string, role: string, schema: SchemaName) {
//     const db = getDB(schema);

//     if (role === 'state_manager') {
//     return db.City.findAll({
//     include: [{model: db.District,
//              include: [{model: db.State,
//                        include: [{model: db.UserLocation, where: { userId },}],}],}],});
//     } else if (role === 'district_manager') {
//     return db.City.findAll({
//     include: [{
//     model: db.District,
//     include: [{
//     model: db.UserLocation,
//     where: { userId },
//     }],
//     }],
//     });
//     } else if (role === 'city_manager' || role === 'service_worker') {
//     return db.City.findAll({
//     include: [{
//     model: db.UserLocation,
//     where: { userId },
//     }],
//     });
//     }

//     return [];
//     }
