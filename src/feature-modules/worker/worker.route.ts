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
            'superadmin',
            'client_manager',
            'state_manager',
            'district_manager',
            'city_manager',
            'service_worker',
        ],
    },
);

router.post(
    '/',
    [
        validate(ZRegisterWorker),
        async (req, res, next) => {
            try {
                const result = await workerService.addWorker(
                    req.body,
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
            'superadmin',
            'client_manager',
            'state_manager',
            'district_manager',
            'city_manager',
            'service_worker',
        ],
    },
);

router.patch(
    '/:workerId',
    [
        validate(ZupdateWorker),
        async (req, res, next) => {
            try {
                const { workerId } = req.params;
                const result = await workerService.updateWorker(
                    req.body,
                    workerId,
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
            'superadmin',
            'client_manager',
            'state_manager',
            'district_manager',
            'city_manager',
            'service_worker',
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
                const result = workerService.deleteWorker(id, 'public');
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
            'client_manager',
            'state_manager',
            'district_manager',
            'city_manager',
            'service_worker',
        ],
    },
);

export default new Route('/worker', router.ExpressRouter);
