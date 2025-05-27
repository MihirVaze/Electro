import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { CanRegister } from '../../utility/createUsersPermition';
import { ResponseHandler } from '../../utility/response-handler';
import { validate } from '../../utility/validate';
import userService from './user.service';
import { ZRegiterUser } from './user.types';

const router = new CustomRouter();

// Register Employee For Electro
// along with multiple roles on multiplr locations
router.post(
    '/login',
    [
        validate(ZRegiterUser),
        async (req, res, next) => {
            try {
                const schema = req.payload.schema;
                const creatorRoleId = req.payload.roleId;
                const { user, roles } = req.body;

                const canRegister = CanRegister(creatorRoleId, roles, schema);
                if (!canRegister) throw { status: 403, message: 'FORBIDDEN' };

                const result = userService.onBoardUser(user, roles, schema);
                res.send(new ResponseHandler(result));
            } catch (e) {
                next(e);
            }
        },
    ],
    { is_protected: false },
);

export default new Route('/user', router.ExpressRouter);
