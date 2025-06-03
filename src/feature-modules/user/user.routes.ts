import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { HasPermission } from '../../utility/usersPermissions';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import userService from './user.service';
import { User, UserRoleLocation, ZEditUser, ZregisterUser } from './user.types';
import { ROLE } from '../role/role.data';

const router = new CustomRouter();

// Register Employee For Electro and for different clients according to the schemas
// along with multiple roles on multiplr locations
router.post(
    '/register',
    [
        validate(ZregisterUser),
        async (req, res, next) => {
            try {
                const { schema, roleIds: creatorRoleId } = req.payload;
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
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_MANAGER,
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
        ],
    },
);

router.patch(
    '/',
    [
        validate(ZEditUser),
        async (req, res, next) => {
            try {
                const { schema, roleIds: editorRoleId } = req.payload;
                const user: User = req.body;

                // if we are taking id from body that means someone else is editing the user so we need to know if they have permition
                if (user.id) {
                    const userRoles = await userService.getUserRolesIds(
                        user.id,
                        schema,
                    );

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
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_MANAGER,
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
            ROLE.WORKER,
            ROLE.SERVICE_WORKER,
        ],
    },
);

router.del(
    '/:id',
    [
        async (req, res, next) => {
            try {
                const userId = req.params.id;
                const { schema, roleIds: deletorRoleId } = req.payload;
                const userRoles = await userService.getUserRolesIds(
                    userId,
                    schema,
                );

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
            ROLE.SUPER_ADMIN,
            ROLE.CLIENT_MANAGER,
            ROLE.CLIENT_ADMIN,
            ROLE.STATE_MANAGER,
            ROLE.DISTRICT_MANAGER,
            ROLE.CITY_MANAGER,
        ],
    },
);

export default new Route('/user', router.ExpressRouter);
