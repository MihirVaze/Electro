import { DataTypes, Model } from 'sequelize';
import { Grievance } from './grievance.type';
import { UserSchema } from '../user/user.schema';
import { sequelize } from '../../connections/pg.connection';

export class GrievanceSchema extends Model<Grievance, Grievance> {}

GrievanceSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        customerId: {
            type: DataTypes.UUID,
        },
        grievanceTypeId: {
            type: DataTypes.UUID,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(
                'pending',
                'in-progress',
                'escalated',
                'resolved',
                'rejected',
            ),
            defaultValue: 'pending',
        },
        assignedTo: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        escalatedTo: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        location: {
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
        modelName: 'Grievance',
        tableName: 'Grievance',
        sequelize,
    },
);
