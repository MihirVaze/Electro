import express from 'express';
import connection from './connections/pg.connection';
import { registerMiddlewares } from './routes/router';
import { generateAllBills } from './utility/generate-bill';
import { checkClientBillPayment } from './utility/check-bill-due';

export const startServer = async () => {
    try {
        const app = express();

        await connection.connectToPg();
        registerMiddlewares(app);

        generateAllBills();
        checkClientBillPayment();
        const { PORT } = process.env;
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
    } catch (e) {
        console.log(e);
        process.nextTick(() => {
            process.exit(1);
        });
    }
};
