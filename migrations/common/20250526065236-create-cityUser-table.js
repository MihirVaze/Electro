module.exports = {
  async up({ context }) {
    const { queryInterface, Sequelize, schema } = context;
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        { tableName: 'CityUser', schema },
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'User',
              key: 'id',
            },
          },
          cityId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'City',
              key: 'id',
            },
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
            defaultValue: null,
          },
          restoredAt: {
            type: DataTypes.DATE,
            defaultValue: null,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
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
      await queryInterface.dropTable({ tableName: 'CityUser', schema });

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
