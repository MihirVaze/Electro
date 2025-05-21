import authService from "./auth.service";
import { validate } from "../../utility/validate";
import { ZCredentials, Credentials, ZChangePassWord } from "./auth.type";
import { ResponseHandler } from "../../utility/response-handler";
import { CustomRouter } from "../../routes/custom.router";
import { Route } from "../../routes/routes.types";

const router = CustomRouter();

router.post("/login", [validate(ZCredentials, "body")], async (req, res, next) => {
    try {
        const body = req.body as Credentials
        const result = await authService.login(body);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
}, { is_protected: false });


router.put("/", [validate(ZChangePassWord, 'body')], async (req, res, next) => {
    try {
        const result = await authService.update({ ...req.body, id: req.payload.id })
        res.send(result);
    } catch (e) {
        next(e);
    }
}, { is_protected: true, has_Access: [] });

export default new Route("/auth", router.ExpressRouter);