import clientService from '../../client/client.service';
import customerService from '../../customer/customer.service';
import discountService from '../../discount/discount.service';
import planService from '../../plan/plan.service';
import clientBillRepo from './clientBill.repo';
import { CLIENT_BILL_RESPONSES } from './clientBill.responses';
import { ClientBill } from './clientBill.types';

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
                    status: 'unpaid',
                    clientId: userId,
                    planId: planId,
                    basePrice: basePrice,
                    discountId: discountId,
                    discountType: discountType,
                    discountValue: discountValue,
                    total: total,
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
}

export default new ClientBillService();
