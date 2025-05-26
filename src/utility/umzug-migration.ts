import { SequelizeStorage, Umzug } from 'umzug';
import { sequelize } from '../connections/pg.connection';
import { Sequelize } from 'sequelize';

export const runMigration = async (schema: string, migrations: string) => {
  sequelize.createSchema(schema, {});

  const queryInterface = sequelize.getQueryInterface();

  const umzug = new Umzug({
    migrations: { glob: migrations },
    context: { queryInterface, Sequelize, schema },
    storage: new SequelizeStorage({ sequelize, schema }),
    logger: console,
  });

  await umzug.up();
};

// Call the runMigration method with the schema name and the migration folder in this way:-
// runMigration('tata','migrations/public/*.js');
// runMigration('tata','migrations/client/*.js');