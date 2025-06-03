import express from 'express';
import connection, { sequelize } from './connections/pg.connection';
import { registerMiddlewares } from './routes/router';
import { createJob } from './utility/scheduler';
import clientBillService from './feature-modules/billing/clientBill/clientBill.service';
import customerBillService from './feature-modules/billing/customerBill/customerBill.service';

export const startServer = async () => {
    try {
        const app = express();

        await connection.connectToPg();
        registerMiddlewares(app);
        //sequelize.sync();
        createJob('0 0 28 * *', () => clientBillService.generateClientBill());
        const schemas = await sequelize.showAllSchemas({});
        for (const schema of schemas) {
            createJob('30 8 25 * *', () =>
                customerBillService.generateCustomerBill(String(schema)),
            );
        }

        const { PORT } = process.env;
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
    } catch (e) {
        console.log(e);
        process.nextTick(() => {
            process.exit(1);
        });
    }
};
