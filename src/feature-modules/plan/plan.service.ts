import { Op } from "sequelize";
import planRepo from "./plan.repo";
import { PLAN_RESPONSES } from "./plan.responses";
import { Plan } from "./plan.type";

class planServices {

    async findOnePlan(plan: Partial<Plan>) {
        try {
            const planRecord = await planRepo.get({
                where: { id: plan.id, isDeleted: false },
                attributes: {
                    exclude: [
                        'isDeleted', 'deletedBy', 'deletedAt',
                        'restoredBy', 'restoredAt',
                        'createdBy', 'updatedBy'
                    ]
                }
            });

            if (!planRecord) throw PLAN_RESPONSES.PLAN_NOT_FOUND;

            return planRecord.dataValues;
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async getPlans(limit: number, page: number, plan: Partial<Plan>){
      try {
  
          let where: any = {};
  
          const { minCustomers, maxCustomers, minPrice, maxPrice, basePrice,...remainingPlan } = plan;
  
          if (maxCustomers) {
              where.customers = { [Op.lte]: maxCustomers }
          }
  
          if (minCustomers) {
              where.customers = { [Op.gte]: minCustomers }
          }
  
          if (maxPrice) {
              where.price = { [Op.lte]: maxPrice }
          }
  
          if (minPrice) {
              where.price = { [Op.gte]: minPrice }
          }

          if(basePrice) {
              where.price = { [Op.eq]: basePrice}
          }
  
          where = { ...remainingPlan, ...where };
  
          const offset = (page - 1) * limit;
  
          const result = await planRepo.getAll({
              where: { isDeleted: false, ...where },
              limit,
              offset
          });
  
          return result;
  
      } catch (e) {
          console.log(e);
          throw e;
      }
  }

    async createPlan(plan: Plan) {
        try {
            const result = await planRepo.create(plan);
            return PLAN_RESPONSES.PLAN_CREATED
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async updatePlan(plan: Partial<Plan>) {
        try {
            if (!plan.id) throw "ID NOT FOUND"
            const result = await planRepo.update(plan, { where: { id: plan.id } });
            if (!result[0]) throw PLAN_RESPONSES.PLAN_UPDATION_FAILED;
            return PLAN_RESPONSES.PLAN_UPDATED
        } catch (e) {
            console.dir(e)
            throw e;
        }
    }

    async deleteplan(id: string) {
        try {
            const result = await planRepo.delete({ where: { id } });
            if (!result[0]) throw PLAN_RESPONSES.PLAN_DELETION_FAILED;
            return PLAN_RESPONSES.PLAN_DELETED;
        } catch (e) {
            console.dir(e)
            throw e
        }
    }
}

export default new planServices()