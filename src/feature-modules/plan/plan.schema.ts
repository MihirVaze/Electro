import { DataTypes, Model } from 'sequelize';
import { Plan } from './plan.type';
import { sequelize } from '../../connections/pg.connection';

export class PlanSchema extends Model<Plan, Plan> {}

PlanSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        minCustomers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maxCustomers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        basePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: 'Plan',
        modelName: 'Plan',
        sequelize,
    },
);
