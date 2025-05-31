import { ResponseHandler } from '../../utility/response-handler';
import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import clientService from './client.service';
import { validate } from '../../utility/validate';
import { ZFindClients, ZRegisterClient, ZUpdateClient } from './client.type';
import userService from '../user/user.service';
import { HasPermission } from '../../utility/usersPermissions';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindClients),
        async (req, res, next) => {
            try {
                const { limit, page, ...remainingQuery } = req.query;
                const result = await clientService.getClients(
                    remainingQuery,
                    Number(limit),
                    Number(page),
                    'public',
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: false,
        has_Access: [
            'superadmin',
            'client_manager',
            'state_manager',
            'district_manager',
            'city_manager',
        ],
    },
);

router.post(
    '/',
    [
        validate(ZRegisterClient),
        async (req, res, next) => {
            try {
                const result = await clientService.addClient(
                    req.body,
                    'public',
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

router.patch(
    '/:clientId',
    [
        validate(ZUpdateClient),
        async (req, res, next) => {
            try {
                const { clientId } = req.params;
                const result = await clientService.updateClient(
                    req.body,
                    clientId,
                    'public',
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: false, has_Access: [ROLE.SUPER_ADMIN] },
);

router.del(
    '/:id',
    [
        async (req, res, next) => {
            try {
                const userId = req.params.id;
                const schema = req.payload.schema;
                const deletorRoleId = req.payload.roleId;
                const userRoles = (
                    await userService.getUserRoles({ userId }, schema)
                )
                    .map((e) => e.dataValues.id)
                    .filter((e): e is string => !!e);

                const canUpdate = HasPermission(
                    deletorRoleId,
                    userRoles,
                    schema,
                );
                if (!canUpdate) throw { status: 403, message: 'FORBIDDEN' };

                const result = await clientService.deleteClient(userId, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: true,
        has_Access: [ROLE.SUPER_ADMIN],
    },
);

export default new Route('/client', router.ExpressRouter);
