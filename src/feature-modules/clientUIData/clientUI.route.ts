import multer from 'multer';
import { CustomRouter } from '../../routes/custom.router';
import { validate } from '../../utility/validate';
import { uiData, ZValidateClientUI, ZvalidatePatch } from './clientUIData.type';
import clientUIService from './clientUI.service';
import { ResponseHandler } from '../../utility/response-handler';
import { Route } from '../../routes/routes.types';
import { FileUpload } from '../../utility/multer.storage';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();
const upload = FileUpload('./uploads', {
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
});

router.post(
    '/:id',
    [
        upload.single('avatar'),
        validate(ZValidateClientUI),
        async (req, res, next) => {
            try {
                if (!req.file) {
                    throw { status: 400, message: 'Bad Request Logo Required' };
                }
                const schema = req.payload.schema;
                const userId = req.payload.id;
                const details = {
                    ...req.body,
                    logo: req.file?.path,
                };
                const result = await clientUIService.createClientUI(
                    details,
                    req.params.id,
                    schema,
                    userId,
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
    '/:id',
    [
        validate(ZValidateClientUI),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const result = await clientUIService.getUIDetails(
                    req.params.id,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

router.patch(
    '/:id',
    [
        validate(ZvalidatePatch),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const detailsToUpdate = {
                    ...req.body,
                    updatedBy: req.payload.id,
                };
                const result = await clientUIService.updateUIDetails(
                    detailsToUpdate,
                    req.params.id,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

router.del(
    '/:id',
    [
        validate(ZValidateClientUI),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const userId = req.payload.id;
                const result = await clientUIService.deleteUI(
                    req.params.id,
                    userId,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: true, has_Access: [ROLE.SUPER_ADMIN] },
);

export default new Route('/ui', router.ExpressRouter);
