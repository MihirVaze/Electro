import roleServices from '../feature-modules/role/role.services';
import { RoleEnum } from '../feature-modules/role/role.types';

export const CanRegister = async (
    creatorRoleIds: string[],
    rolesToCreate: string[],
    schema: string,
) => {
    const creatorRoles = await Promise.all(
        creatorRoleIds.map(
            async (e) => (await roleServices.getRole({ id: e }, schema)).role,
        ),
    );

    const creatableRoles = await Promise.all(
        rolesToCreate.map(
            async (e) => (await roleServices.getRole({ id: e }, schema)).role,
        ),
    );

    const mapping: Record<Exclude<RoleEnum, 'superadmin'>, RoleEnum[]> = {
        client_manager: [
            'state_manager',
            'district_manager',
            'city_manager',
            'worker',
        ],
        state_manager: ['district_manager', 'city_manager', 'worker'],
        district_manager: ['city_manager', 'worker'],
        city_manager: ['worker'],
        worker: [],
        client_admin: [],
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
