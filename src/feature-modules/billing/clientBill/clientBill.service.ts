import { SchemaName } from '../../../utility/umzug-migration';
import clientService from '../../client/client.service';
import customerService from '../../customer/customer.service';
import discountService from '../../discount/discount.service';
import planService from '../../plan/plan.service';
import clientBillRepo from './clientBill.repo';
import { CLIENT_BILL_RESPONSES } from './clientBill.responses';
import { ClientBill, FindClientBill } from './clientBill.types';

class ClientBillService {
    async generateClientBill() {
        try {
            const clients = await clientService.getAllClients();
            const schema = 'public';
            const clientBills: ClientBill[] = [];
            for (const client of clients) {
                let discountValue: number;
                let total: number;
                const { schemaName, userId } = client.dataValues;

                const discount = await discountService.findOneDiscount(
                    { clientId: userId },
                    schema,
                );
                const countOfCustomer =
                    await customerService.getCustomerCount(schemaName);
                const plan = await planService.getBasePrice(
                    countOfCustomer,
                    schema,
                );

                const { id: planId, basePrice } = plan;
                const {
                    id: discountId,
                    type: discountType,
                    value: discountPercentage,
                } = discount;

                const dueDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
                if (!userId || !planId || !discountId)
                    throw CLIENT_BILL_RESPONSES.CLIENT_BILL_CREATION_FIELDS_MISSING;
                if (discountType === 'decrement') {
                    discountValue = (plan.basePrice * discountPercentage) / 100;
                    total = plan.basePrice - discountValue;
                } else {
                    discountValue = (plan.basePrice * discountPercentage) / 100;
                    total = plan.basePrice + discountValue;
                }

                const clientBill: ClientBill = {
                    planId,
                    basePrice,
                    discountId,
                    discountType,
                    discountValue,
                    total,
                    clientId: userId,
                    status: 'unpaid',
                    billingDate: new Date(),
                    dueDate: dueDate,
                };

                clientBills.push(clientBill);
            }

            await clientBillRepo.create(clientBills, schema);

            return CLIENT_BILL_RESPONSES.CLIENT_BILL_CREATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async getClientBills(
        clientBill: Partial<FindClientBill>,
        limit: number,
        page: number,
        schema: SchemaName,
    ) {
        try {
            const offset = (page - 1) * limit;

            const result = await clientBillRepo.getAll(
                {
                    where: clientBill,
                    limit,
                    offset,
                },
                schema,
            );

            return result;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }

    async updateClientBill(
        clientBill: Partial<ClientBill>,
        clientBillId: string,
        schema: SchemaName,
    ) {
        try {
            const result = await clientBillRepo.update(
                {
                    status: clientBill.status,
                },
                {
                    where: {
                        id: clientBillId,
                    },
                },
                schema,
            );
            if (!result[0])
                throw CLIENT_BILL_RESPONSES.CLIENT_BILL_CANT_BE_UPDATED;
            return CLIENT_BILL_RESPONSES.CLIENT_BILL_UPDATED;
        } catch (error) {
            console.dir(error);
            throw error;
        }
    }
}

export default new ClientBillService();
