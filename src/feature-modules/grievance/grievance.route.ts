import { ResponseError } from '@sendgrid/mail';
import { CustomRouter } from '../../routes/custom.router';
import { validate } from '../../utility/validate';
import grievanceService from './grievance.service';
import { ZFindGrievance } from './grievance.type';
import { ResponseHandler } from '../../utility/response-handler';
import { Route } from '../../routes/routes.types';

const router = new CustomRouter();

router.post(
    '/',
    [
        validate(ZFindGrievance),
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
    { is_protected: true, has_Access: ['customer'] },
);

export default new Route('/grievance', router.ExpressRouter);
