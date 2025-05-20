import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

export const validate = (schema: Schema, part: "body" | "params" | "query") => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const {success, data, error} = schema.safeParse(req[part]);
            if(error) throw { status: 400, error, message: 'BAD REQUEST' }
            if(part !== "query") {
                req[part] = data;
            } req.parsedQuery = data;
            
            next();
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}