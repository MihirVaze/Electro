import multer from "multer";
import { CustomRouter } from "../../routes/custom.router";
import { ResponseHandler } from "../../utility/response-handler";
import { validate } from "../../utility/validate";
import meterService from "./meter.service";
import { ZFilterMeter, Zmeter, ZUpdateMeter } from "./meter.type";
import { Route } from "../../routes/routes.types";
import { FileUpload } from "../../utility/multer.storage";


const router = new CustomRouter();
const upload = FileUpload('./uploads', {
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
});

router.get(
    '/',
    [
        validate(ZFilterMeter),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { limit, page, ...filters } = req.query;
                const result = await meterService.getMeters(Number(limit), Number(page), filters, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        }
    ],
    { is_protected: true, has_Access: ['superadmin'] }
);

router.get(
    '/:id',
    [   
        validate(Zmeter),
        async (req, res, next) => {
            try {
                
                const schema = req.payload.schema;
                const id = req.params.id;
                 
                const result = await meterService.findOneMeter({ id }, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        }
    ],
    { is_protected: true, has_Access: ['superadmin'] }
);

router.post(
    '/',
    [   
        upload.single('avatar'),
        validate(Zmeter),
        async (req, res, next) => {
            try {
                if(!req.file){
                   throw {status:400,message:"Bad Request"}
                }
                const image=req.file.filename;
                const schema = req.payload.schema;
                const body={
                    ...req.body,
                    image:image
                }
                const result = await meterService.createMeter(body, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        }
    ],
    { is_protected: true, has_Access: ['superadmin'] }
);

router.patch(
    '/:id',
    [
        validate(ZUpdateMeter),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await meterService.updateMeter(id, req.body, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        }
    ],
    { is_protected: true, has_Access: ['superadmin'] }
);

router.del(
    '/:id',
    [
        validate(Zmeter),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const result = await meterService.deleteMeter(id, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        }
    ],
    { is_protected: true, has_Access: ['superadmin'] }
);

export default new Route('/meter', router.ExpressRouter);
