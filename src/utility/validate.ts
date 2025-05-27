import { z, AnyZodObject } from 'zod';
import { RequestHandler } from 'express';
import { ZUser } from '../feature-modules/user/user.types';

export const validate = (schema: AnyZodObject): RequestHandler => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
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
