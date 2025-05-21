import { DataTypes, Model } from "sequelize";
import { User } from "./user.types";
import { sequelize } from "../../connections/pg.connection";

export class UserSchema extends Model<User, User> { }

UserSchema.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    restoredBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    createdBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
    restoredAt: {
        type: DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
})