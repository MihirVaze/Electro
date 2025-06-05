import { CustomRouter } from '../../../routes/custom.router';
import { Route } from '../../../routes/routes.types';
import { ResponseHandler } from '../../../utility/response-handler';
import { validate } from '../../../utility/validate';
import { ROLE } from '../../role/role.data';
import clientBillService from './clientBill.service';
import {
    ZValidateFindClientBill,
    ZValidateUpdateClientBill,
} from './clientBill.types';

const router = new CustomRouter();

router.post(
    '/',
    [
        async (req, res, next) => {
            try {
                const result = await clientBillService.generateClientBill();
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: true,
        has_Access: [ROLE.SUPER_ADMIN],
    },
);

router.get(
    '/',
    [
        validate(ZValidateFindClientBill),
        async (req, res, next) => {
            try {
                const { limit, page, ...remainingQuery } = req.query;
                const result = await clientBillService.getClientBills(
                    remainingQuery,
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
        has_Access: [ROLE.SUPER_ADMIN],
    },
);

router.patch(
    '/:id',
    [
        validate(ZValidateUpdateClientBill),
        async (req, res, next) => {
            try {
                const { id } = req.params;
                const result = await clientBillService.updateClientBill(
                    req.body,
                    id,
                    'public',
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN, ROLE.CLIENT_ADMIN] },
);

export default new Route('/client-bill', router.ExpressRouter);
