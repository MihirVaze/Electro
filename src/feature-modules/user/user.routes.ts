import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { HasPermission } from '../../utility/usersPermissions';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import userService from './user.service';
import { ZRegiterUser } from './user.types';

const router = new CustomRouter();

// Register Employee For Electro and for different clients according to the schemas
// along with multiple roles on multiplr locations
router.post(
    '/regiter',
    [
        validate(ZRegiterUser),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const creatorRoleId = req.payload.roleId;
                const { user, roles } = req.body;

                const canRegister = HasPermission(creatorRoleId, roles, schema);
                if (!canRegister) throw { status: 403, message: 'FORBIDDEN' };

                const result = await userService.onBoardUser(
                    user,
                    roles,
                    schema,
                );
                res.send(new ResponseHandler(result.responses));
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
            'client_admin',
            'state_manager',
            'district_manager',
            'city_manager',
        ],
    },
);

router.patch(
    '/user/:id?',
    [
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const editorRoleId = req.payload.roleId;
                const user = req.body;
                user.id = req.params.id || req.payload.id;

                // if we are taking id from params that means someone else is editing the user so we need to know if they have permition
                if (req.params.id) {
                    const userRoles = (
                        await userService.getUserRoles(
                            { userId: user.id },
                            schema,
                        )
                    )
                        .map((e) => e.id)
                        .filter((e): e is string => !!e);
                    const canUpdate = HasPermission(
                        editorRoleId,
                        userRoles,
                        schema,
                    );
                    if (!canUpdate) throw { status: 403, message: 'FORBIDDEN' };
                }

                const result = await userService.updateUser(user, schema);
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
            'client_admin',
            'state_manager',
            'district_manager',
            'city_manager',
            'worker',
            'service_worker',
        ],
    },
);

router.del(
    '/:id',
    [
        async (req, res, next) => {
            try {
                const userId = req.params.id;
                const schema = req.payload.schema;
                const deletorRoleId = req.payload.roleId;
                const userRoles = (
                    await userService.getUserRoles({ userId }, schema)
                )
                    .map((e) => e.id)
                    .filter((e): e is string => !!e);

                const canUpdate = HasPermission(
                    deletorRoleId,
                    userRoles,
                    schema,
                );
                if (!canUpdate) throw { status: 403, message: 'FORBIDDEN' };

                const result = await userService.deleteUser(userId, schema);
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
            'client_admin',
            'state_manager',
            'district_manager',
            'city_manager',
        ],
    },
);

export default new Route('/user', router.ExpressRouter);
