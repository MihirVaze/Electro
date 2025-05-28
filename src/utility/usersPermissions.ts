import { SchemaName } from './umzug-migration';
import roleServices from '../feature-modules/role/role.services';
import { RoleEnum } from '../feature-modules/role/role.types';

export const HasPermission = async (
    creatorRoleIds: string[],
    rolesToCreate: string[],
    schema: SchemaName,
) => {
    const creatorRoles = (
        await Promise.all(
            creatorRoleIds.map(
                async (e) =>
                    (await roleServices.getRole({ id: e }, schema)).role,
            ),
        )
    ).filter(
        (role) =>
            (schema === 'public' && role !== 'service_worker') ||
            (schema !== 'public' && role !== 'worker'),
    );

    const creatableRoles = await Promise.all(
        rolesToCreate.map(
            async (e) => (await roleServices.getRole({ id: e }, schema)).role,
        ),
    );

    const mapping: Record<Exclude<RoleEnum, 'superadmin'>, RoleEnum[]> = {
        client_manager: [
            'client_manager',
            'state_manager',
            'district_manager',
            'city_manager',
            'worker',
        ],
        client_admin: [
            'client_admin',
            'state_manager',
            'district_manager',
            'city_manager',
            'service_worker',
        ],
        state_manager: [
            'district_manager',
            'city_manager',
            'worker',
            'service_worker',
        ],
        district_manager: ['city_manager', 'worker', 'service_worker'],
        city_manager: ['worker', 'service_worker'],
        worker: [],
        service_worker: [],
    };

    for (const role of creatableRoles) {
        const isAllowed = creatorRoles.some((creator) => {
            if (creator === 'superadmin') return true;
            return mapping[creator].includes(role);
        });
        if (!isAllowed) return false;
    }

    return true;
};
