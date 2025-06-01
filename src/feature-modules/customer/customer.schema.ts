import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/pg.connection';
import { UserSchema } from '../user/user.schema';
import {
    Customer,
    CustomerWorker,
    CustomerMeter,
    CreateCustomer,
} from './customer.type';
import { CitySchema } from '../location/location.schema';
import { MeterSchema } from '../meter/meter.schema';

export class CustomerSchema extends Model<CreateCustomer, CreateCustomer> {}

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

export class CustomerWorkerSchema extends Model<
    CustomerWorker,
    CustomerWorker
> {}

CustomerWorkerSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        workerId: {
            type: DataTypes.UUID,
            references: {
                model: {
                    tableName: 'User',
                    schema: 'public',
                },
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
        modelName: 'CustomerWorker',
        tableName: 'CustomerWorker',
    },
);

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

CustomerMeterSchema.belongsTo(MeterSchema, {
    foreignKey: 'meterId',
    as: 'meter',
});

MeterSchema.hasOne(CustomerMeterSchema, {
    foreignKey: 'meterId',
    as: 'customerMeter',
});

CustomerWorkerSchema.belongsTo(UserSchema, {
    foreignKey: 'customerId',
    as: 'customer',
});
CustomerWorkerSchema.belongsTo(UserSchema, {
    foreignKey: 'workerId',
    as: 'worker',
});

UserSchema.hasMany(CustomerWorkerSchema, {
    foreignKey: 'customerId',
    as: 'customer',
});
UserSchema.hasMany(CustomerWorkerSchema, {
    foreignKey: 'workerId',
    as: 'worker',
});

UserSchema.hasMany(CustomerSchema, { foreignKey: 'userId', as: 'user' });
CustomerSchema.belongsTo(UserSchema, { foreignKey: 'userId', as: 'user' });

CustomerMeterSchema.belongsTo(CustomerSchema, {
    foreignKey: 'userId',
    as: 'customer',
});
