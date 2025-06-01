import { scheduleJob } from 'node-schedule';
import customerBillService from '../feature-modules/billing/customerBill/customerBill.service';
import { sequelize } from '../connections/pg.connection';

export default scheduleJob('30 8 25 * *', async function () {
    try {
        const schemas = await sequelize.showAllSchemas({});
        for (let schema of schemas) {
            const schemaName = String(schema);
            await customerBillService.generateCustomerBill(schemaName);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
});
