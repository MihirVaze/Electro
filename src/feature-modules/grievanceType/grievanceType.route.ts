import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import grievanceTypeService from './grievanceType.service';
import {
    ZCreateGrievanceType,
    ZDeleteGrievanceType,
    ZFindGrievanceType,
    ZFindGrievanceTypes,
    ZUpdateGrievanceType,
} from './grievanceType.type';

const router = new CustomRouter();

router.get('/', [
    validate(ZFindGrievanceTypes),
    async (req, res, next) => {
        try {
            const schema = req.payload.schema;
            const { limit, page, ...search } = req.query;
            const result = grievanceTypeService.getAllGrievanceType(
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
]);

router.get('/grievanceType/:id', [
    validate(ZFindGrievanceType),
    async (req, res, next) => {
        try {
            const schema = req.payload.schema;
            const id = req.params.id;
            const result = grievanceTypeService.findOneGrievanceType(
                { id },
                schema,
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

router.post('/', [
    validate(ZCreateGrievanceType),
    async (req, res, next) => {
        try {
            const schema = req.payload.schema;
            const result = grievanceTypeService.createGrievanceType(
                req.body,
                schema,
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

router.patch('/:id', [
    validate(ZUpdateGrievanceType),
    async (req, res, next) => {
        try {
            const schema = req.payload.schema;
            const id = req.params.id;
            const result = grievanceTypeService.updateGrievanceType(
                id,
                req.body,
                schema,
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

router.del('/:id', [
    validate(ZDeleteGrievanceType),
    async (req, res, next) => {
        try {
            const schema = req.payload.schema;
            const id = req.params.id;
            const result = grievanceTypeService.deleteGrievanceType(id, schema);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

export default new Route('/grievanceType', router.ExpressRouter);
