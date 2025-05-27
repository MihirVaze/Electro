import { DataTypes, Model } from 'sequelize';
import { Role } from './role.types';
import { sequelize } from '../../connections/pg.connection';
import { UserSchema } from '../user/user.schema';

export class RoleSchema extends Model<Role, Role> {}

RoleSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        role: {
            type: DataTypes.ENUM(
                'superadmin',
                'client_manager',
                'state_manager',
                'district_manager',
                'city_manager',
                'worker',
                'client_admin',
            ),
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
        modelName: 'Role',
        tableName: 'Role',
        sequelize,
    },
);
