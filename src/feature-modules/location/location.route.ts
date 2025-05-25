import { CustomRouter } from '../../routes/custom.router';
import { Route } from '../../routes/routes.types';
import { ResponseHandler } from '../../utility/response-handler';
import locationService from './location.service';

const router = new CustomRouter();
//STATE
router.post(
  '/state',
  [
    async (req, res, next) => {
      try {
        const result = locationService.createState(req.body);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.get(
  '/state/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.getState(req.params.id);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.get(
  '/state',
  [
    async (req, res, next) => {
      try {
        const result = locationService.getAllStates();
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.patch(
  '/state/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.updateState(req.params.id, req.body);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.del(
  '/state/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.deleteState(req.params.id);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

//DISTRICT
router.post(
  '/district',
  [
    async (req, res, next) => {
      try {
        const result = locationService.createDistrict(req.body);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.get(
  '/district/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.getDistrict(req.params.id);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.get(
  '/district',
  [
    async (req, res, next) => {
      try {
        const result = locationService.getAllDistricts();
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.patch(
  '/district/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.updateDistrict(req.params.id, req.body);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.del(
  '/district/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.deleteDistrict(req.params.id);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

//CITY
router.post(
  '/city',
  [
    async (req, res, next) => {
      try {
        const result = locationService.createCity(req.body);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.get(
  '/city/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.getCity(req.params.id);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.get(
  '/city',
  [
    async (req, res, next) => {
      try {
        const result = locationService.getAllCitys();
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.patch(
  '/city/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.updateCity(req.params.id, req.body);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

router.del(
  '/city/:id',
  [
    async (req, res, next) => {
      try {
        const result = locationService.deleteCity(req.params.id);
        res.send(new ResponseHandler(result));
      } catch (error) {
        return next(error);
      }
    },
  ],
  { is_protected: true, has_Access: ['superadmin'] },
);

export default new Route('/location', router.ExpressRouter);
