import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { HasPermission } from '../../utility/usersPermissions';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import userService from './user.service';
import { User, UserRoleLocation, ZEditUser, ZregisterUser } from './user.types';

const router = new CustomRouter();

// Register Employee For Electro and for different clients according to the schemas
// along with multiple roles on multiplr locations
router.post(
    '/register',
    [
        validate(ZregisterUser),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const creatorRoleId = req.payload.roleId;
                const user = req.body.user as User;
                const rolesLocations = req.body.roles as UserRoleLocation[];
                const roles = rolesLocations.map((e) => e.roleId);

                const canRegister = HasPermission(creatorRoleId, roles, schema);
                if (!canRegister) throw { status: 403, message: 'FORBIDDEN' };

                const result = await userService.onBoardUser(
                    user,
                    rolesLocations,
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
    '/user',
    [
        validate(ZEditUser),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const editorRoleId = req.payload.roleId;
                const user = req.body;

                // if we are taking id from params that means someone else is editing the user so we need to know if they have permition
                if (user.id) {
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
                } else user.id = req.payload.id;

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
