import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../connections/pg.connection';
import { CreateClient } from './client.type';
import { UserSchema } from '../user/user.schema';

export class ClientSchema extends Model<CreateClient, CreateClient> {}

ClientSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        clientName: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        schemaName: {
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
        modelName: 'Client',
        tableName: 'Client',
    },
);

ClientSchema.belongsTo(UserSchema, { foreignKey: 'userId' });
UserSchema.hasMany(ClientSchema, { foreignKey: 'userId' });
