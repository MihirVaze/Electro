module.exports = {
  async up({ context }) {
    const { queryInterface, Sequelize, schema } = context;
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        { tableName: 'User', schema },
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
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
      await queryInterface.dropTable({ tableName: 'User', schema });

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
