import { SequelizeStorage, Umzug } from "umzug"
import { sequelize } from "../connections/pg.connection"
import { Sequelize } from "sequelize";

export const runMigration = async (schema: string) => {

  sequelize.createSchema(schema, {});

  const queryInterface = sequelize.getQueryInterface();

  const umzug = new Umzug({
    migrations: { glob: 'migrations/*.js' },
    context: { queryInterface, Sequelize, schema },
    storage: new SequelizeStorage({ sequelize, schema }),
    logger: console,
  })

  await umzug.up();
}
