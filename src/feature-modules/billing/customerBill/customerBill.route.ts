import { CustomRouter } from '../../../routes/custom.router';
import { Route } from '../../../routes/routes.types';
import { ResponseHandler } from '../../../utility/response-handler';
import { validate } from '../../../utility/validate';
import { ROLE } from '../../role/role.data';
import customerBillService from './customerBill.service';
import { ZFindBills, ZUpdateBill } from './customerBill.type';

const router = new CustomRouter();

router.post(
    '/',
    [
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const userId = req.payload.id;
                const result = await customerBillService.generateCustomerBill(
                    userId,
                    schema,
                );
                res.send(result);
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
    '/:billId',
    [
        validate(ZUpdateBill),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const body = {
                    ...req.body,
                    updatedBy: req.payload.id,
                };
                const { billId } = req.params;
                const result = await customerBillService.updateBillStatus(
                    body,
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
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_MANAGER,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.SERVICE_WORKER,
            ROLE.CUSTOMER,
        ],
    },
);

export default new Route('/customer-bill', router.ExpressRouter);
