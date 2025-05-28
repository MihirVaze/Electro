import { ResponseHandler } from '../../utility/response-handler';
import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { validate } from '../../utility/validate';
import customerService from './customer.service';
import {
    ZFindCustomer,
    ZRegisterCustomer,
    ZUpdateCustomer,
} from './customer.type';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindCustomer),
        async (req, res, next) => {
            try {
                const { limit, page } = req.query;
                const schema = req.payload.schema;
                const result = await customerService.getCustomers(
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

export default new Route('/customer', router.ExpressRouter);
