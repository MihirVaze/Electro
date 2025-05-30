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
                const schema = req.payload.schema;
                const result = await workerService.getWorkers(
                    req.query,
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
        validate(ZRegisterWorker),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const result = await workerService.addWorker(req.body, schema);
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
        ],
    },
);

router.patch(
    '/:workerId',
    [
        validate(ZupdateWorker),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { workerId } = req.params;
                const result = await workerService.updateWorker(
                    req.body,
                    workerId,
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
            'client_manager',
            'state_manager',
            'district_manager',
            'city_manager',
        ],
    },
);

router.del(
    '/:id',
    [
        validate(ZDeleteWorker),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = workerService.deleteWorker(id, schema);
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
        ],
    },
);

export default new Route('/worker', router.ExpressRouter);
