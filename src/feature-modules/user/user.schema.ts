import { DataTypes } from "sequelize";
import { baseSchema } from "../../utility/base.schema";

export const UserSchema = baseSchema("User",
    {
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
    },
    {
        modelName: 'User',
        tableName: 'User',
    }
)
