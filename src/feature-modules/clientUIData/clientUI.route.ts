import multer from 'multer';
import { CustomRouter } from '../../routes/custom.router';
import { validate } from '../../utility/validate';
import { uiData } from './clientUIData.type';
import clientUIService from './clientUI.service';
import { ResponseHandler } from '../../utility/response-handler';
import { Route } from '../../routes/routes.types';

const router = new CustomRouter();
const upload = multer();

router.post('/:id', [
    upload.single('avatar'),
    validate(uiData),
    async (req, res, next) => {
        try {
            if (!req.file) {
                throw { status: 400, message: 'Bad Request Logo Required' };
            }
            const details = {
                ...req.body,
                logo: req.file?.filename,
            };
            const result = await clientUIService.createClientUI(
                details,
                req.params.id,
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
            const result = await clientUIService.getUIDetails(req.params.id);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

router.patch('/:id', [
    async (req, res, next) => {
        try {
            const result = await clientUIService.updateUIDetails(
                req.body,
                req.params.id,
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    },
]);

export default new Route('/ui', router.ExpressRouter);
