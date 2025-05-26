module.exports = {
  async up({ context }) {
    const { queryInterface, Sequelize, schema } = context;
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        { tableName: 'ClientUI', schema },
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          clientId: {
            type: DataTypes.UUID,
            references: {
              model: 'Client',
              key: 'id',
            },
          },
          baseColor: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          accentColor: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          fontColor: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          baseFont: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          accentFont: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
          deletedBy: {
            type: DataTypes.UUID,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          restoredBy: {
            type: DataTypes.UUID,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          createdBy: {
            type: DataTypes.UUID,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          updatedBy: {
            type: DataTypes.UUID,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          deletedAt: {
            type: DataTypes.DATE,
          },
          restoredAt: {
            type: DataTypes.DATE,
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      console.log(error);
      console.log('..........Rolling Back Transaction..........');
      await transaction.rollback();
      console.log('.........Transaction Rolled Back..........');
      throw error;
    }
  },

  async down({ context }) {
    const { queryInterface, Sequelize, schema } = context;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable({
        tableName: 'ClientUI',
        schema,
      });

      await transaction.commit();
    } catch (error) {
      console.log(error);
      console.log('..........Rolling Back Transaction..........');
      await transaction.rollback();
      console.log('.........Transaction Rolled Back..........');
      throw error;
    }
  },
};
