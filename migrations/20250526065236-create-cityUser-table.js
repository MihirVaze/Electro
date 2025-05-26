module.exports = {
  async up({ context }) {

    const { queryInterface, Sequelize, schema } = context;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable({ tableName: 'CityUser', schema }, {
        id: {
          type: Sequelize.UUID,
          defaultValue:  Sequelize.UUIDV4,
          primaryKey: true
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        cityId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'City',
            key: 'id'
          }
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
        deletedAt: {
          type: Sequelize.DATE,
          defaultValue: null,
        },
        restoredAt: {
          type: Sequelize.DATE,
          defaultValue: null
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
      await queryInterface.dropTable({ tableName: 'CityUser', schema })

      await transaction.commit()
    } catch (error) {
      console.log(error);
      console.log('..........Rolling Back Transaction..........');
      await transaction.rollback();
      console.log('.........Transaction Rolled Back..........');
    }
  }
}