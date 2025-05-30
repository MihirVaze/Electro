import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/pg.connection';
import { UserSchema } from '../user/user.schema';
import { Customer, CustomerWorker } from './customer.type';
import { CitySchema } from '../location/location.schema';

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
        customerId: {
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

CustomerWorkerSchema.belongsTo(UserSchema, { foreignKey: 'customerId' });
CustomerWorkerSchema.belongsTo(UserSchema, { foreignKey: 'workerId' });

UserSchema.hasMany(CustomerWorkerSchema, { foreignKey: 'customerId' });
UserSchema.hasMany(CustomerWorkerSchema, { foreignKey: 'workerId' });
