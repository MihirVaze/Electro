import { Sequelize } from 'sequelize';
import { runMigration } from '../utility/umzug-migration';

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

export const sequelize: Sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        dialect: DB_DIALECT,
        logging: false,
    },
);

export class Connection {
    public async connectToPg() {
        try {
            await sequelize.authenticate();

            const schemas = await sequelize.showAllSchemas({});

            await runMigration('public', 'migrations/common/*js');
            await runMigration('public', 'migrations/electro/*js');

            await runMigration('public', 'seeders/*js');

            schemas.map(async (schema) => {
                await runMigration(String(schema), 'migrations/client/*js');
                await runMigration(String(schema), 'migrations/common/*js');

                await runMigration(String(schema), 'seeders/*js');
            });

            console.log('CONNECTED TO PG DATABASE');
        } catch (e) {
            console.log('COULD NOT CONNECT TO PG DATABASE');
            throw e;
        }
    }
}

export default new Connection();
