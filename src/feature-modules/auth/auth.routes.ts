import authService from './auth.service';
import { validate } from '../../utility/validate';
import { ZCredentials, Credentials, ZChangePassWord } from './auth.type';
import { ResponseHandler } from '../../utility/response-handler';
import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';

const router = new CustomRouter();

<<<<<<< HEAD
router.post("/login", [validate(ZCredentials), async (req, res, next) => {
    try {
        const body = req.body as Credentials
        const result = await authService.login(body);
=======
router.post(
  '/login',
  [
    validate(ZCredentials),
    async (req, res, next) => {
      try {
        const schema = req.headers.schema;
        if (typeof schema !== 'string' || !schema) throw Error('Enter Valid Schema');

        const body = req.body as Credentials;
        const result = await authService.login(body, schema);
>>>>>>> feature/clientUI
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
        const result = await authService.update({ ...req.body, id: req.payload.id });
        res.send(result);
      } catch (e) {
        next(e);
      }
    },
  ],
  { is_protected: true, has_Access: [] },
);

export default new Route('/auth', router.ExpressRouter);
