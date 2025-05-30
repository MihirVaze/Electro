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
    { is_protected: true, has_Access: ['client_admin'] }
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
    { is_protected: true, has_Access: ['client_admin'] }
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
                const image=req.file.path;
                const schema = req.payload.schema;
                const body={
                    ...req.body,
                    image:image,
                    createdBy:req.payload.id
                }
                const result = await meterService.createMeter(body, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        }
    ],
    { is_protected: true, has_Access: ['client_admin'] }
);

router.patch(
    '/:id',
    [
        validate(ZUpdateMeter),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const detailsToUpdate={
                ...req.body,
                updatedBy:req.payload.id
             };
                const result = await meterService.updateMeter(id, detailsToUpdate, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        }
    ],
    { is_protected: true, has_Access: ['client_admin'] }
);

router.del(
    '/:id',
    [
        validate(Zmeter),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const id = req.params.id;
                const userId=req.payload.id;
                const result = await meterService.deleteMeter(id, schema,userId);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        }
    ],
    { is_protected: true, has_Access: ['client_admin'] }
);

export default new Route('/meter', router.ExpressRouter);
