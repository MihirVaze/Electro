import { DataTypes, Model } from "sequelize";
import { Consumption } from "./conumption.type";
import { sequelize } from "../../connections/pg.connection";


export class ConsumptionSchema extends Model<Consumption,Consumption>{}

ConsumptionSchema.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    customerId:{
        type:DataTypes.UUID,
        references:{
            model:'Customer',
            key:'id'
        }
    },
    workerId:{
        type:DataTypes.UUID,
        references:{
            model:'Worker',
            key:'id'
        }
    },
    unitsUsed:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
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
        updatedAt: {
            type: DataTypes.DATE,
        },
},{
    modelName:'Consumption',
    tableName:'Consumption',
    sequelize:sequelize
});