import { DataTypes, Model } from 'sequelize';
import { Grievance } from './grievance.type';
import { UserSchema } from '../user/user.schema';
import { sequelize } from '../../connections/pg.connection';
import { GrievanceTypeSchema } from '../grievanceType/grievanceType.schema';
import { RoleSchema } from '../role/role.schema';
import { CitySchema } from '../location/location.schema';

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
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        grievanceTypeId: {
            type: DataTypes.UUID,
            references: {
                model: GrievanceTypeSchema,
                key: 'id',
            },
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
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: CitySchema,
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

GrievanceSchema.belongsTo(CitySchema, { foreignKey: 'location', as: 'city' });
CitySchema.hasMany(GrievanceSchema, {
    foreignKey: 'location',
    as: 'grievances',
});
