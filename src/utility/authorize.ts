import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Has_Access } from '../routes/routes.types';
import { Payload } from '../feature-modules/auth/auth.type';
import roleServices from '../feature-modules/role/role.services';
import { ROLE } from '../feature-modules/role/role.data';

export const authorizeT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        if (!token) throw 'UNAUTHORISED';

        const payload = verify(token, process.env.JWT_SECRET_KEY) as Payload;
        console.log(payload);
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
            const { roleId } = req.payload;

            if (
                Array.isArray(roleId) &&
                roleId.length > 0 &&
                AuthorizedFor.some((e) => roleId.includes(e))
            ) {
                next();
            } else {
                throw 'FORBIDDEN';
            }
        } catch (e) {
            next({ status: 403, message: 'FORBIDDEN' });
        }
    };
