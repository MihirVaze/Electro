import { v4 } from 'uuid';
import { ClientUIData, UIData } from './clientUIData.type';
import clientUIRepo from './clientUI.repo';
import { UI_RESPONSES } from './clientUI.response';

class ClientUIService {
    async createClientUI(details:UIData, id: string,schema:string,userId:string) {
        try {
            const newDetails = {
                id: v4(),
                clientId: id,
                ...details,
                createdBy:userId
            };
            const result = await clientUIRepo.createClientUI(newDetails,schema);
            if (!result) {
                throw UI_RESPONSES.UI_CREATION_FAILS;
            }
            return UI_RESPONSES.UI_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getUIDetails(id: string,schema:string) {
        try {
            const result = await clientUIRepo.getAllUIDetails({
                where: { clientId: id },
            },schema);
            if (!result) {
                throw { status: 500, message: 'Internal Server Error' };
            }
            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getOne(id: string,schema:string) {
        try {
            const result = await clientUIRepo.getUIDetails({
                where: { clientId: id },
            },schema);
            if (!result) {
                throw UI_RESPONSES.UI_NOT_FOUND;
            }
            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateUIDetails(details: Partial<ClientUIData>, id: string,schema:string) {
        try {
            const counts = await clientUIRepo.updateClientUI(details, {
                where: { clientId: id },
            },schema);
            if (counts[0] === 0) {
                throw UI_RESPONSES.UI_NOT_FOUND;
            }
            return UI_RESPONSES.UI_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteUI(id:string,userId:string,schema:string){
        try{
           const result=await clientUIRepo.updateClientUI({isDeleted:true,deletedBy:userId,deletedAt:new Date()},{where:{clientId:id}},schema);
           if(result[0]===0){
            throw {status:500,message:"Something Went Wrong"}
           }
           return UI_RESPONSES.UI_DELETED;
        }
        catch(e){
           console.dir(e);
           throw e
        }
    }
}

export default new ClientUIService();
