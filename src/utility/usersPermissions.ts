import { SchemaName } from './umzug-migration';
import { ROLE } from '../feature-modules/role/role.data';

const mapping: Record<string, string[]> = {
    [ROLE.CLIENT_MANAGER]: [
        ROLE.CLIENT_MANAGER,
        ROLE.STATE_MANAGER,
        ROLE.DISTRICT_MANAGER,
        ROLE.CITY_MANAGER,
        ROLE.WORKER,
    ],
    [ROLE.CLIENT_ADMIN]: [
        ROLE.CLIENT_ADMIN,
        ROLE.STATE_MANAGER,
        ROLE.DISTRICT_MANAGER,
        ROLE.CITY_MANAGER,
        ROLE.SERVICE_WORKER,
    ],
    [ROLE.STATE_MANAGER]: [
        ROLE.DISTRICT_MANAGER,
        ROLE.CITY_MANAGER,
        ROLE.WORKER,
        ROLE.SERVICE_WORKER,
    ],
    [ROLE.DISTRICT_MANAGER]: [
        ROLE.CITY_MANAGER,
        ROLE.WORKER,
        ROLE.SERVICE_WORKER,
    ],
    [ROLE.CITY_MANAGER]: [ROLE.WORKER, ROLE.SERVICE_WORKER],
    [ROLE.WORKER]: [],
    [ROLE.SERVICE_WORKER]: [],
    [ROLE.CUSTOMER]: [],
};

export const HasPermission = (
    creatorRoleIds: string[],
    rolesToCreate: string[],
    schema: SchemaName,
) => {
    const filteredCreatorRoleIds = creatorRoleIds.filter(
        (id) =>
            (schema === 'public' && id !== ROLE.SERVICE_WORKER) ||
            (schema !== 'public' && id !== ROLE.WORKER),
    );

    for (const roleId of rolesToCreate) {
        const isAllowed = filteredCreatorRoleIds.some((creatorId) => {
            if (creatorId === ROLE.SUPER_ADMIN) return true;
            return mapping[creatorId]?.includes(roleId);
        });
        if (!isAllowed) return false;
    }
    return true;
};
