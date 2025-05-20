import { Router as ExpressRouter } from 'express'
import { authorizeR, authorizeT } from '../utility/authorize'
import { Method, Middleware, RouteOptions } from './routes.types'

export const CustomRouter = () => {
	const router = ExpressRouter()

	const addRoute = (method: Method) => {

		return (path: string, extraMiddlewares: Middleware[] | null, reqMiddleware: Middleware, options?: RouteOptions) => {
			let middlewares: Middleware[] = []
			if (extraMiddlewares) middlewares = [...extraMiddlewares]

			if (!options) options = {
				is_protected: true,
				has_Access: []
			}

			if (options.is_protected && options.has_Access) {
				// Token Validation 
				middlewares.push(authorizeT);
				// authorization Fuctionaity
				middlewares.push(authorizeR(options.has_Access))
			}

			router[method](path, ...middlewares, reqMiddleware)
		}
	}

	return {
		get: addRoute('get'),
		post: addRoute('post'),
		put: addRoute('put'),
		patch: addRoute('patch'),
		delete: addRoute('delete'),
		ExpressRouter: router
	}
}