import multer from 'multer';
import { CustomRouter } from '../../routes/custom.router';
import { validate } from '../../utility/validate';
import { uiData } from './clientUIData.type';
import clientUIService from './clientUI.service';
import { ResponseHandler } from '../../utility/response-handler';
import { Route } from '../../routes/routes.types';
import { FileUpload } from '../../utility/multer.storage';

const router = new CustomRouter();
const upload = FileUpload('./uploads', {
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
});

router.post('/:id', [
    upload.single('avatar'),
    validate(uiData),
    async (req, res, next) => {
        try {
            if (!req.file) {
                throw { status: 400, message: 'Bad Request Logo Required' };
            }
            const schema=req.payload.schema;
            const details = {
                ...req.body,
                logo: req.file?.path,
            };
            const result = await clientUIService.createClientUI(
                details,
                req.params.id,
                schema
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

router.get('/:id', [
    async (req, res, next) => {
        try {
             const schema=req.payload.schema;
            const result = await clientUIService.getUIDetails(req.params.id,schema);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

router.patch('/:id', [
    async (req, res, next) => {
        try {
             const schema=req.payload.schema;
            const result = await clientUIService.updateUIDetails(
                req.body,
                req.params.id,
                schema
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

router.del('/:id', [
    async (req, res, next) => {
        try {
             const schema=req.payload.schema;
            const result = await clientUIService.deleteUI(
                req.params.id,
                schema
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);


export default new Route('/ui', router.ExpressRouter);
