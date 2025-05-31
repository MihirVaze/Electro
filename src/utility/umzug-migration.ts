import { SequelizeStorage, Umzug } from 'umzug';
import { sequelize } from '../connections/pg.connection';
import { DataTypes, Sequelize } from 'sequelize';

export const runMigrationAndSeeders = async (
    schema: SchemaName,
    migrations: string,
    type: 'migration' | 'seeder',
) => {
    sequelize.createSchema(schema, {});

    const modelName =
        type === 'migration' ? 'SequelizeMigrationMeta' : 'SequelizeSeederMeta';

    const queryInterface = sequelize.getQueryInterface();

    const model = sequelize.define(
        modelName,
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
                primaryKey: true,
            },
        },
        {
            schema,
            modelName,
        },
    );

    const umzug = new Umzug({
        migrations: { glob: migrations },
        context: { queryInterface, Sequelize, schema },
        storage: new SequelizeStorage({ model }),
        logger: console,
    });

    await umzug.up();
};

export type SchemaName = 'public' | (string & {});

// Call the runMigration method with the schema name and the migration folder in this way:-
// runMigration('tata','migrations/public/*.js','migration');
// runMigration('tata','migrations/client/*.js','migration');
