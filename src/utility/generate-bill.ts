import { sequelize } from '../connections/pg.connection';
import clientBillService from '../feature-modules/billing/clientBill/clientBill.service';
import customerBillService from '../feature-modules/billing/customerBill/customerBill.service';
import { createJob } from './scheduler';

export const generateAllBills = async () => {
    const jobs: Function[] = [];

    const schemas = await sequelize.showAllSchemas({});

    for (const schema of schemas) {
        if (String(schema) !== 'public')
            jobs.push(() =>
                customerBillService.generateCustomerBill(String(schema)),
            );
    }

    jobs.push(() => clientBillService.generateClientBill());

    createJob('0 0 28 * *', jobs);
};
