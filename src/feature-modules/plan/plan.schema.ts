import { DataTypes, Model } from 'sequelize';
import { Plan } from './plan.type';
import { sequelize } from '../../connections/pg.connection';
import { UserSchema } from '../user/user.schema';

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
        deletedBy: {
            type: DataTypes.UUID,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        restoredBy: {
            type: DataTypes.UUID,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        createdBy: {
            type: DataTypes.UUID,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        updatedBy: {
            type: DataTypes.UUID,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
        restoredAt: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: 'Plan',
        modelName: 'Plan',
        sequelize,
    },
);
