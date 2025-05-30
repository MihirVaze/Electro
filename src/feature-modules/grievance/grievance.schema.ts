import { DataTypes, Model } from 'sequelize';
import { Grievance } from './grievance.type';
import { UserSchema } from '../user/user.schema';
import { sequelize } from '../../connections/pg.connection';
import { GrievanceTypeSchema } from '../grievanceType/grievanceType.schema';
import { RoleSchema } from '../role/role.schema';

export class GrievanceSchema extends Model<Grievance, Grievance> {}

GrievanceSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
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
            type: DataTypes.ENUM('pending', 'in-progress', 'resolved'),
            defaultValue: 'pending',
        },
        assignedTo: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        escalatedTo: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: RoleSchema,
                key: 'id',
            },
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

GrievanceSchema.belongsTo(UserSchema, { foreignKey: 'userId' });
UserSchema.hasMany(GrievanceSchema, { foreignKey: 'userId' });

GrievanceSchema.belongsTo(GrievanceTypeSchema, {
    foreignKey: 'grievanceTypeId',
});
GrievanceTypeSchema.hasMany(GrievanceSchema, { foreignKey: 'grievanceTypeId' });
