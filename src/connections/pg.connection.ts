import { Sequelize } from 'sequelize';
import { runMigrationAndSeeders } from '../utility/umzug-migration';

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

            await runMigrationAndSeeders(
                'public',
                'migrations/common/*js',
                'migration',
            );
            await runMigrationAndSeeders(
                'public',
                'migrations/electro/*js',
                'migration',
            );
            await runMigrationAndSeeders('public', 'seeders/*js', 'seeder');

            for (const schema of schemas) {
                await runMigrationAndSeeders(
                    String(schema),
                    'migrations/common/*js',
                    'migration',
                );
                await runMigrationAndSeeders(
                    String(schema),
                    'migrations/client/*js',
                    'migration',
                );
                await runMigrationAndSeeders(
                    String(schema),
                    'seeders/*js',
                    'seeder',
                );
            }

            console.log('CONNECTED TO PG DATABASE');
        } catch (e) {
            console.log('COULD NOT CONNECT TO PG DATABASE');
            throw e;
        }
    }
}

export default new Connection();
