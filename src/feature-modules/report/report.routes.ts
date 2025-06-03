import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import { ROLE } from '../role/role.data';
import reportsServices from './report.services';
import {
    GrievanceReportOptions,
    TimePeriod,
    ZERevenueReportOptions,
    ZGrievanceReportQuery,
    MeterReportOptions,
    WorkerReportOptions,
    ZMeterReportOptions,
    ZworkerReportOption,
} from './report.types';

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

router.get(
    '/meter',
    [
        validate(ZMeterReportOptions),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const parsedQuery: MeterReportOptions = req.parsedQuery;

                const result = await reportsServices.meterUsageReport(
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

router.get(
    '/worker',
    [
        validate(ZworkerReportOption),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const parsedQuery: WorkerReportOptions = req.parsedQuery;

                const result = await reportsServices.workerReport(
                    schema,
                    parsedQuery,
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
    '/revenue',
    [
        validate(ZERevenueReportOptions),
        async (req, res, next) => {
            try {
                const timePeriod: TimePeriod = req.parsedQuery.timePeriod;

                const result =
                    await reportsServices.electroRevenueReport(timePeriod);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

export default new Route('/report', router.ExpressRouter);
