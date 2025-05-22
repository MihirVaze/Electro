import { CustomRouter } from "../../routes/custom.router";
import { Route } from "../../routes/routes.types";
import { ResponseHandler } from "../../utility/response-handler";
import { validate } from "../../utility/validate";
import planService from "./plan.service";
import { ZCreatePlan, ZDeletePlan, ZFindPlan, ZFindPlans, ZUpdatePlan } from "./plan.type";

const router = new CustomRouter();

router.get("/", [validate(ZFindPlans), async (req, res, next) => {
  try {
    const { limit, page, ...search } = req.query;
    const result = planService.getPlans(Number(limit), Number(page), search);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}], { is_protected: true, has_Access: ['superadmin'] });


router.get("/plan/:id", [validate(ZFindPlan), async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = planService.findOnePlan({ id });
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}], { is_protected: true, has_Access: ['superadmin'] });


router.post("/", [validate(ZCreatePlan), async (req, res, next) => {
  try {
    const result = planService.createPlan(req.body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}], { is_protected: true, has_Access: ['superadmin'] });


router.patch("/:id", [validate(ZUpdatePlan), async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = planService.updatePlan(id, req.body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}], { is_protected: true, has_Access: ['superadmin'] });


router.del("/:id", [validate(ZDeletePlan), async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = planService.deleteplan(id);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
}], { is_protected: true, has_Access: ['superadmin'] });


export default new Route("/plan", router.ExpressRouter);