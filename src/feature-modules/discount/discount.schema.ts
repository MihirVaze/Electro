import { DataTypes, Model } from 'sequelize';
import { Discount } from './discount.type';
import { UserSchema } from '../user/user.schema';
import { sequelize } from '../../connections/pg.connection';

export class DiscountSchema extends Model<Discount, Discount> {}

DiscountSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        clientId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        type: {
            type: DataTypes.ENUM('increment', 'decrement', 'none'),
            allowNull: false,
        },
        value: {
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
        tableName: 'Discount',
        modelName: 'Discount',
    },
);

DiscountSchema.belongsTo(UserSchema, {
    foreignKey: 'clientId',
    as: 'client',
});

UserSchema.hasOne(DiscountSchema, {
    foreignKey: 'clientId',
    as: 'discount',
});
