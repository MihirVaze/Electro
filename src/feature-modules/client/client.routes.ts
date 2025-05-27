import { ResponseHandler } from '../../utility/response-handler';
import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import clientService from './client.service';
import { validate } from '../../utility/validate';
import { ZClient, ZFindClient, ZUpdateClient } from './client.type';

const router = new CustomRouter();

router.get(
    '/',
    [
        validate(ZFindClient),
        async (req, res, next) => {
            try {
                const { limit, page } = req.query;
                const schema = req.payload.schema;
                const result = await clientService.getClients(
                    req.query,
                    Number(limit),
                    Number(page),
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    {
        is_protected: true,
        has_Access: [
            'superadmin',
            'client_manager',
            'state_manager',
            'district_manager',
            'city_manager',
        ],
    },
);

router.post(
    '/',
    [
        validate(ZClient),
        async (req, res, next) => {
            try {
                const result = await clientService.addClient(
                    req.body,
                    'public',
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: false, has_Access: ['superadmin'] },
);

router.patch(
    '/:clientId',
    [
        validate(ZUpdateClient),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const { clientId } = req.params;
                const result = await clientService.updateClient(
                    req.body,
                    clientId,
                    schema,
                );
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: false, has_Access: ['superadmin'] },
);

export default new Route('/client', router.ExpressRouter);
