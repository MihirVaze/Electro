import { Sequelize } from 'sequelize';

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

export const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: DB_DIALECT,
  logging: false,
});

export class Connection {
    public async connectToPg()  {
    try {
        await sequelize.authenticate();
        console.log('CONNECTED TO PG DATABASE');
    } catch (e) {
        console.log('COULD NOT CONNECT TO PG DATABASE');
        throw e;
    }
}
}

export default new Connection();
