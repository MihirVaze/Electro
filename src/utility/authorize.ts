import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Has_Access } from '../routes/routes.types';
import { Payload } from '../feature-modules/auth/auth.type';

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
            const { roleIds } = req.payload;

            if (
                Array.isArray(roleIds) &&
                roleIds.length > 0 &&
                AuthorizedFor.some((e) => roleIds.includes(e))
            ) {
                next();
            } else {
                throw 'FORBIDDEN';
            }
        } catch (e) {
            next({ status: 403, message: 'FORBIDDEN' });
        }
    };
