import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import { ROLE } from '../role/role.data';
import consumptionService from './consumption.service';
import { Zconsumption, Zcreate, Zfilter, Zupdate } from './conumption.type';

const router = new CustomRouter();

router.post(
    '/',
    [
        //validate(Zconsumption),
        async (req, res, next) => {
            try {
                const schema = req.headers.schema;
                console.log(schema);
                const workerId = req.payload.id;
                const body = {
                    ...req.body,
                    //createdBy: req.payload.id,
                };
                const result = await consumptionService.createConsumption(
                    body,
                    workerId,
                    'adani',
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.WORKER] },
);

router.get(
    '/',
    [
        validate(Zfilter),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { limit, page, ...filters } = req.query;
                const result = await consumptionService.getAllConsumptions(
                    Number(limit),
                    Number(page),
                    filters,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.WORKER, ROLE.CITY_MANAGER] },
);

router.get(
    '/:id',
    [
        validate(Zconsumption),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;

                const result = await consumptionService.getOneConsumption(
                    id,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.WORKER, ROLE.CITY_MANAGER] },
);

router.patch(
    '/:id',
    [
        validate(Zupdate),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const userId = req.payload.id;
                const detailsToUpdate = {
                    ...req.body,
                };
                const result = await consumptionService.updateConsumption(
                    detailsToUpdate,
                    id,
                    userId,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.CITY_MANAGER] },
);

router.del(
    '/:id',
    [
        validate(Zconsumption),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const userId = req.payload.id;
                const result = await consumptionService.deleteConsumption(
                    id,
                    schema,
                    userId,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.CITY_MANAGER] },
);

export default new Route('/consumption', router.ExpressRouter);
