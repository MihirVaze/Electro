import { SchemaName } from '../../utility/umzug-migration';
import roleRepo from './role.repo';
import { ROLE_RESPONSES } from './role.responses';
import { Role } from './role.types';

class RoleServices {
    async getRole(role: Partial<Role>, schema: SchemaName) {
        try {
            const result = await roleRepo.get(
                {
                    where: { ...role, isDeleted: false },
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
            if (!result) throw ROLE_RESPONSES.ROLE_NOT_FOUND;
            return result.dataValues;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getAllRoles(schema: SchemaName) {
        try {
            const result = await roleRepo.getAll(
                {
                    where: { isDeleted: false },
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
            return result.rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new RoleServices();
