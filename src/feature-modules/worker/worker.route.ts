import { validate } from '../../utility/validate';
import { CustomRouter } from '../../routes/custom.router';
import {
    ZDeleteWorker,
    ZFindWorker,
    ZRegisterWorker,
    ZupdateWorker,
} from './worker.type';
import workerService from './worker.service';
import { ResponseHandler } from '../../utility/response-handler';
import { Route } from '../../routes/routes.types';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindWorker),
        async (req, res, next) => {
            try {
                const { limit, page } = req.query;
                const result = await workerService.getWorkers(
                    req.query,
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
            ROLE.SERVICE_WORKER,
        ],
    },
);

router.post(
    '/',
    [
        validate(ZRegisterWorker),
        async (req, res, next) => {
            try {
                const userId = req.payload.id;
                const body = { ...req.body, createdBy: userId };
                const result = await workerService.addWorker(body, 'public');
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
            ROLE.SERVICE_WORKER,
        ],
    },
);

router.patch(
    '/',
    [
        validate(ZupdateWorker),
        async (req, res, next) => {
            try {
                const userId = req.body.userId || req.payload.id;
                const body = { ...req.body, updatedBy: req.payload.id };
                const result = await workerService.updateWorker(
                    body,
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
        has_Access: [
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_MANAGER,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.SERVICE_WORKER,
        ],
    },
);

router.del(
    '/:id',
    [
        validate(ZDeleteWorker),
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const result = workerService.deleteWorker(
                    { id, deletedBy: req.payload.id },
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
            ROLE.SERVICE_WORKER,
        ],
    },
);

export default new Route('/worker', router.ExpressRouter);
