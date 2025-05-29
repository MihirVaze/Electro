import { DataTypes, Model } from "sequelize";
import { Meter } from "./meter.type";
import { sequelize } from "../../connections/pg.connection";
import { UserSchema } from "../user/user.schema";



export class MeterSchema extends Model<Meter, Meter>{ }

MeterSchema.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    basePrice:{
        type:DataTypes.DECIMAL,
        allowNull:true
    },
    pricePerUnit:{
        type:DataTypes.DECIMAL,
        allowNull:true
    },
    requiredPhotos:{
        type:DataTypes.DECIMAL,
      allowNull:true
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:true
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
},{
    modelName:'Meter',
    tableName:'Meter',
    sequelize
});

MeterSchema.belongsTo(UserSchema, {
    foreignKey: 'createdBy',
    as: 'createdByUser',
});
MeterSchema.belongsTo(UserSchema, {
    foreignKey: 'updatedBy',
    as: 'updatedByUser',
});
MeterSchema.belongsTo(UserSchema, {
    foreignKey: 'deletedBy',
    as: 'deletedByUser',
});
MeterSchema.belongsTo(UserSchema, {
    foreignKey: 'restoredBy',
    as: 'restoredByUser',
});