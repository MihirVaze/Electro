import express from 'express';
import { connectToPg, sequelize } from './connections/pg.connection';
import { registerMiddlewares } from './routes/router';

export const startServer = async () => {
  try {
    const app = express();

    await connectToPg();
    registerMiddlewares(app);
    //sequelize.sync();

    const { PORT } = process.env;
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
  } catch (e) {
    console.log(e);
    process.nextTick(() => {
      process.exit(1);
    });
  }
};
