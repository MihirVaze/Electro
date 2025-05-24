import { DataTypes, Model } from "sequelize";
import { ClientUIData } from "./clientUIData.type";
import { ClientSchema } from "../client/client.schema";
import { sequelize } from "../../connections/pg.connection";


export class ClientUISchema extends Model<ClientUIData,ClientUIData> { }

ClientUISchema.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    clientId:{
        type:DataTypes.UUID,
        references:{
            model:ClientSchema,
            key:'id'
        }
    },
    baseColor:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accentColor:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fontColor:{
        type:DataTypes.STRING,
        allowNull:false
    },
    baseFont:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accentFont:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    modelName:'ClientUI',
    tableName:'ClientUI',
    sequelize
})

ClientUISchema.belongsTo(ClientSchema,{
    foreignKey:'clientId',
    as:'clientId'
})