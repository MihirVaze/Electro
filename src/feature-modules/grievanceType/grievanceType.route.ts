import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import { ROLE } from '../role/role.data';
import grievanceTypeService from './grievanceType.service';
import {
    ZCreateGrievanceType,
    ZDeleteGrievanceType,
    ZFindGrievanceType,
    ZFindGrievanceTypes,
    ZUpdateGrievanceType,
} from './grievanceType.type';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindGrievanceTypes),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                if (typeof schema !== 'string' || !schema)
                    throw Error('Enter Valid Schema');
                const { limit, page, ...search } = req.query;
                const result = await grievanceTypeService.getAllGrievanceType(
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
            ROLE.CUSTOMER,
            ROLE.SERVICE_WORKER,
        ],
    },
);

router.get(
    '/grievanceType/:id',
    [
        validate(ZFindGrievanceType),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await grievanceTypeService.findOneGrievanceType(
                    { id },
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
            ROLE.CUSTOMER,
            ROLE.SERVICE_WORKER,
        ],
    },
);

router.post(
    '/',
    [
        validate(ZCreateGrievanceType),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const result = await grievanceTypeService.createGrievanceType(
                    req.body,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.CLIENT_ADMIN] },
);

router.patch(
    '/:id',
    [
        validate(ZUpdateGrievanceType),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await grievanceTypeService.updateGrievanceType(
                    id,
                    req.body,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.CLIENT_ADMIN] },
);

router.del(
    '/:id',
    [
        validate(ZDeleteGrievanceType),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await grievanceTypeService.deleteGrievanceType(
                    id,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.CLIENT_ADMIN] },
);

export default new Route('/grievanceType', router.ExpressRouter);
