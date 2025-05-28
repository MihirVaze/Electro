import { DataTypes, Model } from 'sequelize';
import { Worker } from './worker.type';
import { UserSchema } from '../user/user.schema';
import { CitySchema } from '../location/location.schema';
import { sequelize } from '../../connections/pg.connection';

export class WorkerSchema extends Model<Worker, Worker> {}

WorkerSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        workerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: UserSchema,
                key: 'id',
            },
            allowNull: false,
        },
        cityId: {
            type: DataTypes.UUID,
            references: {
                model: CitySchema,
                key: 'id',
            },
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
        tableName: 'Worker',
        modelName: 'Worker',
    },
);
