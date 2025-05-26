module.exports = {
  async up({ context }) {

    const { queryInterface, Sequelize, schema } = context;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable({ tableName: 'Plan', schema }, {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        minCustomers: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        maxCustomers: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        basePrice: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        deletedBy: {
          type: Sequelize.UUID,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        restoredBy: {
          type: Sequelize.UUID,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        createdBy: {
          type: Sequelize.UUID,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        updatedBy: {
          type: Sequelize.UUID,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Date.now(),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Date.now(),
        },
        deletedAt: {
          type: Sequelize.DATE,
          defaultValue: null,
        },
        restoredAt: {
          type: Sequelize.DATE,
          defaultValue: null
        }
      }, { transaction })

      await transaction.commit();

    } catch (error) {
      console.log(error);
      console.log('..........Rolling Back Transaction..........');
      await transaction.rollback();
      console.log('.........Transaction Rolled Back..........');
    }

  },

  async down({ context }) {
    const { queryInterface, Sequelize, schema } = context;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable({ tableName: 'Plan', schema })

      await transaction.commit()
    } catch (error) {
      console.log(error);
      console.log('..........Rolling Back Transaction..........');
      await transaction.rollback();
      console.log('.........Transaction Rolled Back..........');
    }
  }
}