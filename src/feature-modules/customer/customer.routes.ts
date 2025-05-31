import { ResponseHandler } from '../../utility/response-handler';
import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { validate } from '../../utility/validate';
import customerService from './customer.service';
import {
    ZFindCustomerMeters,
    ZFindCustomers,
    ZFindCustomerWorker,
    ZRegisterCustomerMeter,
    ZValidateRegisterCustomer,
    ZValidateUpdateCustomer,
} from './customer.type';
import userService from '../user/user.service';
import { HasPermission } from '../../utility/usersPermissions';
import { ROLE } from '../role/role.data';

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
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.WORKER,
        ],
    },
);

router.post(
    '/',
    [
        validate(ZValidateRegisterCustomer),
        async (req, res, next) => {
            try {
                const { client } = req.body;
                const result = await customerService.addCustomer(
                    req.body,
                    client,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: false,
        has_Access: [],
    },
);

router.patch(
    '/:customerId',
    [
        validate(ZValidateUpdateCustomer),
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
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
        ],
    },
);

//CUSTOMER-METER
router.get(
    '/customer-meter',
    [
        validate(ZFindCustomerMeters),
        async (req, res, next) => {
            try {
                const { limit, page, ...remainingQuery } = req.query;
                const schema = req.payload.schema;
                const result = await customerService.getCustomerMeters(
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
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.WORKER,
        ],
    },
);

router.post(
    '/customer-meter',
    [
        validate(ZRegisterCustomerMeter),
        async (req, res, next) => {
            try {
                if (!req.body.userId) {
                    req.body.userId = req.payload.id;
                }
                const schema = req.payload.schema;
                const result = await customerService.addCustomerMeter(
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
        is_protected: true,
        has_Access: [
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
        ],
    },
);

router.del(
    '/customer-meter/:id',
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

                const result = await customerService.deleteCustomerMeter(
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
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
        ],
    },
);

router.get(
    '/customer-worker',
    [
        validate(ZFindCustomerWorker),
        async (req, res, next) => {
            try {
                const { limit, page, ...remainingQuery } = req.query;
                const schema = req.payload.schema;
                const result = await customerService.getCustomerWorkers(
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
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.WORKER,
        ],
    },
);

export default new Route('/customer', router.ExpressRouter);
