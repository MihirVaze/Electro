import express from 'express';
import connection from './connections/pg.connection';
import { registerMiddlewares } from './routes/router';
import { createJob } from './utility/scheduler';
import clientBillService from './feature-modules/billing/clientBill/clientBill.service';

export const startServer = async () => {
    try {
        const app = express();

        await connection.connectToPg();
        registerMiddlewares(app);
        //sequelize.sync();
        createJob('0 0 28 * *', () => clientBillService.generateClientBill());

        const { PORT } = process.env;
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
    } catch (e) {
        console.log(e);
        process.nextTick(() => {
            process.exit(1);
        });
    }
};
