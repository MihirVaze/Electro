'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('ClientUI',
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          clientId: {
            type: DataTypes.UUID,
            references: {
              model: ClientSchema,
              key: 'id'
            }
          },
          baseColor: {
            type: DataTypes.STRING,
            allowNull: false
          },
          accentColor: {
            type: DataTypes.STRING,
            allowNull: false
          },
          fontColor: {
            type: DataTypes.STRING,
            allowNull: false
          },
          baseFont: {
            type: DataTypes.STRING,
            allowNull: false
          },
          accentFont: {
            type: DataTypes.STRING,
            allowNull: false
          },
          isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          },
          deletedBy: {
            type: DataTypes.UUID,
            references: {
              model: UserSchema,
              key: 'id'
            }
          },
          restoredBy: {
            type: DataTypes.UUID,
            references: {
              model: UserSchema,
              key: 'id'
            }
          },
          createdBy: {
            type: DataTypes.UUID,
            references: {
              model: UserSchema,
              key: 'id'
            }
          },
          updatedBy: {
            type: DataTypes.UUID,
            references: {
              model: UserSchema,
              key: 'id'
            }
          },
          deletedAt: {
            type: DataTypes.DATE,
          },
          restoredAt: {
            type: DataTypes.DATE,
          }
        }, { transaction });
      await transaction.commit();
    }
    catch (error) {
      console.log(error);
      console.log('..........Rolling Back Transaction..........');
      await transaction.rollback();
      console.log('.........Transaction Rolled Back..........');
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('ClientUI', { transaction });
      await transaction.commit();
    }
    catch (error) {
      console.log(error);
      console.log('..........Rolling Back Transaction..........');
      await transaction.rollback();
      console.log('.........Transaction Rolled Back..........');
    }

  }
};
