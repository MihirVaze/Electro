import express from 'express';
import connection, { sequelize } from './connections/pg.connection';
import { registerMiddlewares } from './routes/router';
import { generateAllBills } from './utility/generate-bill';
import { checkClinetBillDue } from './utility/check-bill-due';

export const startServer = async () => {
    try {
        const app = express();

        await connection.connectToPg();
        registerMiddlewares(app);

        generateAllBills();
        checkClinetBillDue();
        const { PORT } = process.env;
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
    } catch (e) {
        console.log(e);
        process.nextTick(() => {
            process.exit(1);
        });
    }
};
