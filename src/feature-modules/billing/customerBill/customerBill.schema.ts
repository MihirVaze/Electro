import { DataTypes, Model } from 'sequelize';
import { CustomerBill } from './customerBill.type';
import { CustomerMeterSchema } from '../../customer/customer.schema';
import { ConsumptionSchema } from '../../consumption/consumption.schema';
import { sequelize } from '../../../connections/pg.connection';
import { UserSchema } from '../../user/user.schema';

export class CustomerBillSchema extends Model<CustomerBill, CustomerBill> {}

CustomerBillSchema.init(
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
            allowNull: false,
        },
        basePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        perUnitCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        consumptionId: {
            type: DataTypes.UUID,
            references: {
                model: ConsumptionSchema,
                key: 'id',
            },
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        billingDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW(),
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: () =>
                new Date(new Date().setDate(new Date().getDate() + 15)),
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
        sequelize,
        modelName: 'CustomerBill',
        tableName: 'CustomerBill',
    },
);

CustomerMeterSchema.hasMany(CustomerBillSchema, {
    foreignKey: 'customerMeterId',
});
CustomerBillSchema.belongsTo(CustomerMeterSchema, {
    foreignKey: 'customerMeterId',
});
