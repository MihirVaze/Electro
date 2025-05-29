import { DataTypes, Model } from 'sequelize';
import { ClientUIData } from './clientUIData.type';
import { ClientSchema } from '../client/client.schema';
import { sequelize } from '../../connections/pg.connection';
import { UserSchema } from '../user/user.schema';

export class ClientUISchema extends Model<ClientUIData, ClientUIData> {}

ClientUISchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        clientId: {
            type: DataTypes.UUID,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        baseColor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accentColor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fontColor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        baseFont: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accentFont: {
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
                model: 'User',
                key: 'id',
            },
        },
        restoredBy: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        createdBy: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        updatedBy: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
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
        modelName: 'ClientUI',
        tableName: 'ClientUI',
        sequelize,
    },
);

ClientUISchema.belongsTo(ClientSchema, {
    foreignKey: 'clientId',
    as: 'clientId',
});

ClientUISchema.belongsTo(UserSchema, {
    foreignKey: 'createdBy',
    as: 'createdByUser',
});
ClientUISchema.belongsTo(UserSchema, {
    foreignKey: 'updatedBy',
    as: 'updatedByUser',
});
ClientUISchema.belongsTo(UserSchema, {
    foreignKey: 'deletedBy',
    as: 'deletedByUser',
});
ClientUISchema.belongsTo(UserSchema, {
    foreignKey: 'restoredBy',
    as: 'restoredByUser',
});
