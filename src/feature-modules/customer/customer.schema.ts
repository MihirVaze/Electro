import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/pg.connection';
import { UserSchema } from '../user/user.schema';
import { Customer } from './customer.type';
import {
    CitySchema,
    DistrictSchema,
    StateSchema,
} from '../location/location.schema';

export class CustomerSchema extends Model<Customer, Customer> {}

CustomerSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        cityId: {
            type: DataTypes.UUID,
            references: {
                model: CitySchema,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
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
        modelName: 'Customer',
        tableName: 'Customer',
    },
);

CustomerSchema.belongsTo(UserSchema, { foreignKey: 'userId' });
UserSchema.hasMany(CustomerSchema, { foreignKey: 'userId' });

CustomerSchema.belongsTo(CitySchema, { foreignKey: 'cityId' });
CitySchema.hasMany(CustomerSchema, { foreignKey: 'cityId' });
