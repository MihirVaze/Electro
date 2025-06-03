import authService from './auth.service';
import { validate } from '../../utility/validate';
import { ZCredentials, Credentials, ZChangePassWord } from './auth.type';
import { ResponseHandler } from '../../utility/response-handler';
import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();

router.post(
    '/login',
    [
        validate(ZCredentials),
        async (req, res, next) => {
            try {
                const schema = req.headers.schema as string;
                const body = req.body as Credentials;

                const result = await authService.login(body, schema);

                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: false },
);

router.put(
    '/',
    [
        validate(ZChangePassWord),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const result = await authService.update(
                    {
                        ...req.body,
                        id: req.payload.id,
                    },
                    schema,
                );
                res.send(result);
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: true,
        has_Access: [
            ROLE.CITY_MANAGER,
            ROLE.CLIENT_ADMIN,
            ROLE.CLIENT_MANAGER,
            ROLE.CUSTOMER,
            ROLE.DISTRICT_MANAGER,
            ROLE.SERVICE_WORKER,
            ROLE.STATE_MANAGER,
            ROLE.SUPER_ADMIN,
            ROLE.WORKER,
        ],
    },
);

export default new Route('/auth', router.ExpressRouter);
