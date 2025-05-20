import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connections/pg.connection";

export class BaseSchema extends Model<T, T> { }

BaseSchema.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    restoredAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    modelName: '<Modelname>',
    tableName: '<Modelname>',
    sequelize
});