import { CustomRouter } from '../../routes/custom.router';
import { validate } from '../../utility/validate';
import grievanceService from './grievance.service';
import {
    GetGrievance,
    ZAssignOrEscalateGrievance,
    ZDeleteGrievance,
    ZGetGrievance,
    ZRaiseGrievance,
} from './grievance.type';
import { ResponseHandler } from '../../utility/response-handler';
import { Route } from '../../routes/routes.types';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZGetGrievance),
        async (req, res, next) => {
            try {
                const parsedQuery: GetGrievance = req.parsedQuery;
                const result = await grievanceService.getGrievances(
                    req.payload,
                    parsedQuery,
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
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.SERVICE_WORKER,
        ],
    },
);

router.post(
    '/',
    [
        validate(ZRaiseGrievance),
        async (req, res, next) => {
            try {
                const userId = req.body.id || req.payload.id;
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

    { is_protected: true, has_Access: [ROLE.CUSTOMER, ROLE.SERVICE_WORKER] },
);

router.patch(
    '/:id',
    [
        validate(ZAssignOrEscalateGrievance),
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const result = await grievanceService.assignOrEscalateGrievance(
                    id,
                    req.body.action,
                    req.payload,
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
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.SERVICE_WORKER,
        ],
    },
);
router.del(
    '/',
    [
        validate(ZDeleteGrievance),
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const result = await grievanceService.DeleteGrievance(
                    id,
                    req.payload,
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
