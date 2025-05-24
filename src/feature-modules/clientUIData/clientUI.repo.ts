import { FindOptions, UpdateOptions } from "sequelize";
import { ClientUIData } from "./clientUIData.type";
import { ClientUISchema } from "./clientUI.schema";

class ClientUIRepo{
   public async getAllUIDetails(details:FindOptions<ClientUIData>){
    return ClientUISchema.findAll(details);
    }

    public async getUIDetails(details:FindOptions<ClientUIData>){
        return ClientUISchema.findOne(details);
    }

     public async createClientUI(uiDetails:ClientUIData){
         return ClientUISchema.create(uiDetails);
     }
    
     public async updateClientUI(uiDetails: Partial<ClientUIData>, options: UpdateOptions<ClientUIData>) {
             return ClientUISchema.update(uiDetails, options);
         }

}

export default new ClientUIRepo()

