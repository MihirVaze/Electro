import express, {
    Application,
    json,
    NextFunction,
    Request,
    Response,
    urlencoded,
} from 'express';
import cors from 'cors';
import { ResponseHandler } from '../utility/response-handler';
import { routes } from './routes.data';

export const registerMiddlewares = (app: Application) => {
    app.use(
        cors({
            origin: '*',
            allowedHeaders: '*',
            methods: '*',
        }),
    );
    app.use(json());
    app.use(urlencoded());

    app.use('/uploads', express.static('uploads'));

    for (let route of routes) {
        app.use(route.path, route.router);
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500).send(new ResponseHandler(null, err));
    });
};
