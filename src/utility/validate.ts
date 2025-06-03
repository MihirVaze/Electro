import { z, AnyZodObject } from 'zod';
import { RequestHandler } from 'express';
import { ZUser } from '../feature-modules/user/user.types';

export const validate = (schema: AnyZodObject): RequestHandler => {
    return async (req, res, next) => {
        try {
            const parsed = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers,
            });
            if (parsed.query !== undefined) {
                req.parsedQuery = parsed.query;
            }
            next();
        } catch (error) {
            res.status(400).json(error);
        }
    };
};

//example object for user update
export const dataSchema = z.object({
    body: ZUser.pick({
        name: true,
        email: true,
        password: true,
        phoneNo: true,
    }),
    params: ZUser.pick({
        id: true,
    }),
});
