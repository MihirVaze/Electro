import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import discountService from './discount.service';
import {
    ZCreateDiscount,
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
                const result = discountService.getdiscounts(
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
    { is_protected: true, has_Access: ['superadmin'] },
);

router.get(
    '/plan/:id',
    [
        validate(ZFindDiscount),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = discountService.findOneDiscount({ id }, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: ['superadmin'] },
);

router.post(
    '/',
    [
        validate(ZCreateDiscount),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const result = discountService.createDiscount(req.body, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: ['superadmin'] },
);

router.patch(
    '/:id',
    [
        validate(ZUpdateDiscount),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = discountService.updateDiscount(
                    id,
                    req.body,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: ['superadmin'] },
);

router.del(
    '/:id',
    [
        validate(ZDeleteDiscount),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = discountService.deletediscount(id, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: ['superadmin'] },
);

export default new Route('/discount', router.ExpressRouter);
