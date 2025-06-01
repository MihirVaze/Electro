import { Router as ExpressRouter, RequestHandler } from 'express';
import { authorizeR, authorizeT } from '../utility/authorize';
import { Method, Middleware, RouteOptions } from './routes.types';

export class CustomRouter {
    private router = ExpressRouter();

    private addRoute = (method: Method) => {
        return (
            path: string,
            handler: Middleware[],
            options?: RouteOptions,
        ) => {
            const middleware: Middleware[] = [];

            if (!options)
                options = {
                    is_protected: true,
                    has_Access: [],
                };

            if (options.is_protected && options.has_Access) {
                // Token Validation
                middleware.push(authorizeT);
                // authorization Fuctionaity
                middleware.push(authorizeR(options.has_Access));
            }

            this.router[method](path, ...middleware, ...handler);
        };
    };

    public get = this.addRoute('get');

    public post = this.addRoute('post');

    public patch = this.addRoute('patch');

    public del = this.addRoute('delete');

    public put = this.addRoute('put');

    public ExpressRouter = this.router;
}
