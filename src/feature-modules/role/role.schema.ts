import { DataTypes, Model } from "sequelize";
import { Role } from "./role.types";
import { sequelize } from "../../connections/pg.connection";

export class RoleSchema extends Model<Role, Role> { }

RoleSchema.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'distributor', 'consumer', 'ALL'),
    allowNull: false
  }
}, {
  modelName: 'Role',
  tableName: 'Role',
  sequelize
});