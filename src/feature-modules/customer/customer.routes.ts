import { ResponseHandler } from '../../utility/response-handler';
import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { validate } from '../../utility/validate';
import customerService from './customer.service';
import {
    ZFindCustomers,
    ZRegisterCustomer,
    ZUpdateCustomer,
} from './customer.type';
import userService from '../user/user.service';
import { HasPermission } from '../../utility/usersPermissions';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindCustomers),
        async (req, res, next) => {
            try {
                const { limit, page, ...remainingQuery } = req.query;
                const schema = req.payload.schema;
                const result = await customerService.getCustomers(
                    remainingQuery,
                    Number(limit),
                    Number(page),
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: true,
        has_Access: [
            'superadmin',
            'client_admin',
            'state_manager',
            'district_manager',
            'city_manager',
            'worker',
        ],
    },
);

router.post(
    '/',
    [
        validate(ZRegisterCustomer),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const result = await customerService.addCustomer(
                    req.body,
                    schema,
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
            'client_admin',
            'state_manager',
            'district_manager',
            'city_manager',
        ],
    },
);

router.patch(
    '/:customerId',
    [
        validate(ZUpdateCustomer),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { customerId } = req.params;
                const result = await customerService.updateCustomer(
                    req.body,
                    customerId,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: false, has_Access: ['superadmin'] },
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
                    .map((e) => e.id)
                    .filter((e): e is string => !!e);

                const canUpdate = HasPermission(
                    deletorRoleId,
                    userRoles,
                    schema,
                );
                if (!canUpdate) throw { status: 403, message: 'FORBIDDEN' };

                const result = await customerService.deleteCustomer(
                    userId,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: true,
        has_Access: [
            'client_admin',
            'state_manager',
            'district_manager',
            'city_manager',
        ],
    },
);

export default new Route('/customer', router.ExpressRouter);
