import { CustomRouter } from '../../../routes/custom.router';
import { Route } from '../../../routes/routes.types';
import { ResponseHandler } from '../../../utility/response-handler';
import { ROLE } from '../../role/role.data';
import clientBillService from './clientBill.service';

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

export default new Route('/client-bill', router.ExpressRouter);
