import { ResponseHandler } from '../../utility/response-handler';
import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import clientService from './client.service';
import { validate } from '../../utility/validate';
import {
    ZFindClients,
    ZValidateRegisterClient,
    ZValidateUpdateClient,
} from './client.type';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();

router.get(
    '/:userId',
    [
        async (req, res, next) => {
            try {
                const { userId } = req.params;
                const result = await clientService.getClient(
                    { userId },
                    'public',
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
            ROLE.CLIENT_MANAGER,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
        ],
    },
);

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
        is_protected: true,
        has_Access: [
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_MANAGER,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
        ],
    },
);

router.post(
    '/',
    [
        validate(ZValidateRegisterClient),
        async (req, res, next) => {
            try {
                const result = await clientService.addClient(
                    { ...req.body, createdBy: req.payload.id },
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
    '/',
    [
        validate(ZValidateUpdateClient),
        async (req, res, next) => {
            try {
                const userId = req.body.userId || req.payload.id;
                const result = await clientService.updateClient(
                    { ...req.body, updatedBy: userId },
                    userId,
                    'public',
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN, ROLE.CLIENT_ADMIN] },
);

router.del(
    '/:id',
    [
        async (req, res, next) => {
            try {
                const userId = req.params.id;
                const result = await clientService.deleteClient(
                    userId,
                    'public',
                );
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
