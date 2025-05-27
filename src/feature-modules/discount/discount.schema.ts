import { DataTypes, Model } from 'sequelize';
import { Discount } from './discount.type';
import { UserSchema } from '../user/user.schema';
import { sequelize } from '../../connections/pg.connection';
import { ClientSchema } from '../client/client.schema';

export class DiscountSchema extends Model<Discount, Discount> {}

DiscountSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

DiscountSchema.belongsTo(ClientSchema, {
    foreignKey: 'clientId',
    targetKey: 'id',
    as: 'client',
});

ClientSchema.hasOne(DiscountSchema, {
    foreignKey: 'clientId',
    sourceKey: 'id',
    as: 'discount',
});
