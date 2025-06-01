import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import { ROLE } from '../role/role.data';
import reportsServices from './report.services';
import { GrievanceReportOptions, ZGrievanceReportQuery } from './report.types';

const router = new CustomRouter();

router.get(
    '/grievance',
    [
        validate(ZGrievanceReportQuery),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const parsedQuery: GrievanceReportOptions = req.parsedQuery;

                const result = await reportsServices.grievanceReport(
                    schema,
                    parsedQuery,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.CLIENT_ADMIN] },
);

export default new Route('/report', router.ExpressRouter);
