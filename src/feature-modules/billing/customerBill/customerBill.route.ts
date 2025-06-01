import { CustomRouter } from '../../../routes/custom.router';
import { Route } from '../../../routes/routes.types';
import { ResponseHandler } from '../../../utility/response-handler';
import { validate } from '../../../utility/validate';
import customerBillService from './customerBill.service';
import { ZFindBills, ZUpdateBill } from './customerBill.type';

const router = new CustomRouter();

router.post(
    '/',
    [
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const result =
                    await customerBillService.generateCustomerBill(schema);
                res.send(result);
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: true,
        has_Access: ['superadmin'],
    },
);

router.get(
    '/',
    [
        validate(ZFindBills),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { limit, page, ...remainingQuery } = req.query;
                const result = await customerBillService.getAllBills(
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
    '/:billId',
    [
        validate(ZUpdateBill),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { billId } = req.params;
                const result = await customerBillService.updateBillStatus(
                    req.body,
                    billId,
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
            'service_worker',
            'customer',
        ],
    },
);

export default new Route('/customer-bill', router.ExpressRouter);
