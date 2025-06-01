import { DataTypes, Model } from 'sequelize';
import { Consumption } from './conumption.type';
import { sequelize } from '../../connections/pg.connection';
import { CustomerMeterSchema } from '../customer/customer.schema';
import { UserSchema } from '../user/user.schema';
import { WorkerSchema } from '../worker/worker.schema';

export class ConsumptionSchema extends Model<Consumption, Consumption> {}

ConsumptionSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        customerMeterId: {
            type: DataTypes.UUID,
            references: {
                model: CustomerMeterSchema,
                key: 'id',
            },
        },
        workerId: {
            type: DataTypes.UUID,
            references: {
                model: 'Worker',
                key: 'id',
            },
        },
        unitsUsed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        deletedBy: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        restoredBy: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        createdBy: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        updatedBy: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
        restoredAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        modelName: 'Consumption',
        tableName: 'Consumption',
        sequelize: sequelize,
    },
);

CustomerMeterSchema.hasMany(ConsumptionSchema, {
    foreignKey: 'customerMeterId',
    as: 'customerMeter',
});
ConsumptionSchema.belongsTo(CustomerMeterSchema, {
    foreignKey: 'customerMeterId',
    as: 'customerMeter',
});

ConsumptionSchema.belongsTo(WorkerSchema, {
    foreignKey: 'workerId',
    as: 'workerId',
});

ConsumptionSchema.belongsTo(UserSchema, {
    foreignKey: 'createdBy',
    as: 'createdByUser',
});
ConsumptionSchema.belongsTo(UserSchema, {
    foreignKey: 'updatedBy',
    as: 'updatedByUser',
});
ConsumptionSchema.belongsTo(UserSchema, {
    foreignKey: 'deletedBy',
    as: 'deletedByUser',
});
ConsumptionSchema.belongsTo(UserSchema, {
    foreignKey: 'restoredBy',
    as: 'restoredByUser',
});
