import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../connections/pg.connection';
import { UserSchema } from '../../user/user.schema';
import { CreateClientBill } from './clientBill.types';
import { PlanSchema } from '../../plan/plan.schema';
import { DiscountSchema } from '../../discount/discount.schema';

export class ClientBillSchema extends Model<
    CreateClientBill,
    CreateClientBill
> {}

ClientBillSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        basePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        billingDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(),
            values: ['unpaid', 'paid'],
            defaultValue: 'unpaid',
        },
        clientId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: {
                    tableName: 'User',
                    schema: 'public',
                },
            },
        },
        planId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Plan',
                    schema: 'public',
                },
            },
        },
        discountId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: {
                    tableName: 'Discount',
                    schema: 'public',
                },
            },
        },
        discountType: {
            type: DataTypes.ENUM('increment', 'decrement', 'none'),
            allowNull: false,
        },
        discountValue: {
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
        sequelize,
        modelName: 'ClientBill',
        tableName: 'ClientBill',
    },
);

ClientBillSchema.belongsTo(UserSchema, { foreignKey: 'clientId' });
UserSchema.hasMany(ClientBillSchema, { foreignKey: 'clientId' });

ClientBillSchema.belongsTo(PlanSchema, { foreignKey: 'planId' });
PlanSchema.hasMany(ClientBillSchema, { foreignKey: 'planId' });

ClientBillSchema.belongsTo(DiscountSchema, { foreignKey: 'discountId' });
DiscountSchema.hasMany(ClientBillSchema, { foreignKey: 'discountId' });
