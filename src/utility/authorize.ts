import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Has_Access } from '../routes/routes.types';
import { Payload } from '../feature-modules/auth/auth.type';
import roleServices from '../feature-modules/role/role.services';

export const authorizeT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) throw 'UNAUTHORISED';

        const payload = verify(token, process.env.JWT_SECRET_KEY) as Payload;
        req.payload = payload;
        next();
    } catch (e) {
        next({ status: 401, message: 'UNAUTHORIZED' });
    }
};

export const authorizeR =
    (AuthorizedFor: Has_Access) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { roleId, schema } = req.payload;

            const Accessedfor = await Promise.all(
                AuthorizedFor.map(
                    async (e) =>
                        (await roleServices.getRole({ role: e }, schema)).id,
                ),
            );

            if (
                roleId.length !== 0 &&
                Accessedfor.some((e) => (e ? roleId.includes(e) : false))
            )
                next();
            else throw 'FORBIDDEN';
        } catch (e) {
            next({ status: 403, message: 'FORBIDDEN' });
        }
    };
