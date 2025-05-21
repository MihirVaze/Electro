import authService from "./auth.service";
import { NextFunction, Request, Response, Router } from "express";
import { validate } from "../../utility/validate";
import { ZCredentials, Credentials, ZCreateUser, CreateUser, ZChangePassWord } from "./auth.type";
import { User, ZUser } from "../user/user.types";
import { ResponseHandler } from "../../utility/response-handler";
import { CustomRouter } from "../../routes/custom.router";
import { Route } from "../../routes/routes.types";
import { Role, ZRole } from "../role/role.types";
import { generatePassword } from "../../utility/password.generator";
import { sendmail } from "../../utility/sendmail";
import roleServices from "../role/role.services";

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

// temporary PUBLIC route to register an admin
router.post("/register", [validate(ZUser, 'body')], async (req, res, next) => {
    try {
        const body = req.body as User
        const result = await authService.register(body, 'admin');
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
}, { is_protected: false });

router.post("/register/:role", [validate(ZCreateUser, 'body'), validate(ZRole, 'params')], async (req, res, next) => {
    try {
        const { role } = req.params.role as unknown as Role;

        if (creatorRole === 'admin' && role !== 'distributor')
            next({ status: 403, message: "FORBIDDEN" });
        else if (creatorRole === 'distributor' && role !== 'consumer')
            next({ status: 403, message: "FORBIDDEN" });

        const generatedPassword = generatePassword()
        const body = { ...req.body, password: generatedPassword } as User

        const result = await authService.register(body, role);
        // SEND MAIL FOR LOGIN CREDENTIALS
        sendmail(body);

        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
}, { is_protected: true, has_Access: ["admin", 'distributor'] });

router.put("/", [validate(ZChangePassWord, 'body')], async (req, res, next) => {
    try {
        const result = await authService.update({ ...req.body, id: req.payload.id })
        res.send(result);
    } catch (e) {
        next(e);
    }
}, { is_protected: true, has_Access: ['admin', 'consumer', 'distributor'] });

export default new Route("/auth", router.ExpressRouter);