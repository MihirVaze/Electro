import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import { ROLE } from '../role/role.data';
import discountService from './discount.service';
import {
    ZDeleteDiscount,
    ZFindDiscount,
    ZFindDiscounts,
    ZUpdateDiscount,
} from './discount.type';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindDiscounts),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { limit, page, ...search } = req.query;
                const result = await discountService.getdiscounts(
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
        validate(ZFindDiscount),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await discountService.findOneDiscount(
                    { id },
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

router.patch(
    '/:id',
    [
        validate(ZUpdateDiscount),
        async (req, res, next) => {
            try {
                const userId = req.payload.id;
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await discountService.updateDiscount(
                    userId,
                    id,
                    { ...req.body, updatedBy: userId },
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

router.del(
    '/:id',
    [
        validate(ZDeleteDiscount),
        async (req, res, next) => {
            try {
                const userId = req.payload.id;
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await discountService.deletediscount(
                    userId,
                    id,
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

export default new Route('/discount', router.ExpressRouter);
