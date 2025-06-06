import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import { ROLE } from '../role/role.data';
import planService from './plan.service';
import {
    ZCreatePlan,
    ZDeletePlan,
    ZFindPlan,
    ZFindPlans,
    ZUpdatePlan,
} from './plan.type';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindPlans),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { limit, page, ...search } = req.query;
                const result = await planService.getPlans(
                    Number(limit),
                    Number(page),
                    search,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

router.get(
    '/plan/:id',
    [
        validate(ZFindPlan),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await planService.findOnePlan({ id }, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

router.post(
    '/',
    [
        validate(ZCreatePlan),
        async (req, res, next) => {
            try {
                const result = await planService.createPlan(
                    { ...req.body, createdBy: req.payload.id },
                    req.payload.schema,
                );
                console.log(result);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

router.patch(
    '/:id',
    [
        validate(ZUpdatePlan),
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const result = await planService.updatePlan(
                    id,
                    { ...req.body, updatedBy: req.payload.id },
                    req.payload.schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

router.del(
    '/:id',
    [
        validate(ZDeletePlan),
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const result = await planService.deleteplan(id, req.payload);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

export default new Route('/plan', router.ExpressRouter);
