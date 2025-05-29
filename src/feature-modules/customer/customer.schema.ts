import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/pg.connection';
import { UserSchema } from '../user/user.schema';
import { Customer, CustomerMeter } from './customer.type';
import {
    CitySchema,
    DistrictSchema,
    StateSchema,
} from '../location/location.schema';
import { MeterSchema } from '../meter/meter.schema';

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
            references: {
                model: UserSchema,
                key: 'id',
            },
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

export class CustomerMeterSchema extends Model<CustomerMeter, CustomerMeter> {}

CustomerMeterSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        meterId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: MeterSchema,
                key: 'id',
            },
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
        modelName: 'CustomerMeter',
        tableName: 'CustomerMeter',
    },
);

CustomerMeterSchema.hasMany(UserSchema, { foreignKey: 'userId' });
UserSchema.belongsTo(CustomerMeterSchema, { foreignKey: 'userId' });

CustomerMeterSchema.hasMany(MeterSchema, { foreignKey: 'meterId' });
MeterSchema.belongsTo(CustomerMeterSchema, { foreignKey: 'meterId' });
