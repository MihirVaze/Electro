import { Request, Response, NextFunction, Router } from "express";
import { RoleEnum } from "../feature-modules/role/role.types";

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type Has_Access = RoleEnum[]

export type RouteOptions = {
    is_protected: boolean
    has_Access?: Has_Access
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => void

export class Route {
    public static registeredRoutes: Route[] = [];

    constructor(
        public path: string,
        public router: Router
    ) {
        if (!this.path.startsWith("/")) throw new Error(`${this.path} needs to start with '/'`);
        Route.registeredRoutes.push(this)
    }
}

export type Routes = Route[];
