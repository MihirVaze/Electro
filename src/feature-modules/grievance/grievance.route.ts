import { ResponseError } from '@sendgrid/mail';
import { CustomRouter } from '../../routes/custom.router';
import { validate } from '../../utility/validate';
import grievanceService from './grievance.service';
import { ZFindGrievance, ZRaiseGrievance } from './grievance.type';
import { ResponseHandler } from '../../utility/response-handler';
import { Route } from '../../routes/routes.types';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();

router.post(
    '/',
    [
        //validate(ZRaiseGrievance),
        async (req, res, next) => {
            try {
                const userId = req.payload.id;
                const schema = req.payload.schema;
                const result = await grievanceService.raiseGrievance(
                    userId,
                    req.body,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.CUSTOMER] },
);

export default new Route('/grievance', router.ExpressRouter);
