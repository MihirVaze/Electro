import { ResponseError } from '@sendgrid/mail';
import { CustomRouter } from '../../routes/custom.router';
import { validate } from '../../utility/validate';
import grievanceService from './grievance.service';
import {
    ZAssignOrEscalateGrievance,
<<<<<<< HEAD
=======
    ZDeleteGrievance,
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
    ZFindGrievance,
    ZRaiseGrievance,
} from './grievance.type';
import { ResponseHandler } from '../../utility/response-handler';
import { Route } from '../../routes/routes.types';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindGrievance),
        async (req, res, next) => {
            try {
<<<<<<< HEAD
                const userId = req.payload.id;
                const schema = req.payload.schema;
                const roleIds = req.payload.roleId;
=======
                const userId = req.body.id || req.payload.id;
                const schema = req.payload.schema;
                const roleIds = req.payload.roleIds;
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
                const { limit, page, ...search } = req.query;
                const result = await grievanceService.getGrievances(
                    userId,
                    roleIds,
                    Number(limit),
                    Number(page),
                    search,
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
<<<<<<< HEAD
                const userId = req.payload.id;
=======
                const userId = req.body.id || req.payload.id;
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
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
<<<<<<< HEAD
    { is_protected: true, has_Access: [ROLE.CUSTOMER] },
=======
    { is_protected: true, has_Access: [ROLE.CUSTOMER, ROLE.SERVICE_WORKER] },
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
);

router.patch(
    '/:id',
    [
        validate(ZAssignOrEscalateGrievance),
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const userId = req.payload.id;
<<<<<<< HEAD
                const roleIds = req.payload.roleId;
=======
                const roleIds = req.payload.roleIds;
>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
                const schema = req.payload.schema;
                const result = await grievanceService.assignOrEscalateGrievance(
                    userId,
                    roleIds,
                    id,
                    req.body.action,
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
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.SERVICE_WORKER,
        ],
    },
);

<<<<<<< HEAD
=======
router.del(
    '/',
    [
        validate(ZDeleteGrievance),
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const schema = req.payload.schema;
                const result = await grievanceService.DeleteGrievance(
                    id,
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

>>>>>>> 03cf95e2b2bfcd4bdc2cc59ad1bc2b98aa83bc39
export default new Route('/grievance', router.ExpressRouter);
