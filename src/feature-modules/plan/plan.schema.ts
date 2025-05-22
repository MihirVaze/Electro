import { DataTypes, Model } from "sequelize";
import { Plan } from "./plan.type";
import { sequelize } from "../../connections/pg.connection";

export class PlanSchema extends Model<Plan, Plan> { };

PlanSchema.init({
<<<<<<< HEAD
=======
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
>>>>>>> da9fa93040dcce2eb25957b486551613b447b643
  minCustomers: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  maxCustomers: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  basePrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
}
}, {
  tableName: 'Plan',
  modelName: 'Plan',
  sequelize
})