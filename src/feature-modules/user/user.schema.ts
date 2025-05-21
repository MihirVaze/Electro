import { DataTypes, Model } from "sequelize";
import { User } from "./user.types";
import { sequelize } from "../../connections/pg.connection";
import { RoleSchema } from "../role/role.schema";

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
    phone_num: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.UUID,
        references: {
            model: RoleSchema,
            key: 'id'
        },
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
}, {
    modelName: 'User',
    tableName: 'User',
    sequelize
});