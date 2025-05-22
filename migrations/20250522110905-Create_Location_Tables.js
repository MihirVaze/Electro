'use strict';
const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    // STATE
    await queryInterface.createTable('State', {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      deletedBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      restoredBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      updatedBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      restoredAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

    // DISTRICT
    await queryInterface.createTable('District', {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      stateId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'State',
          key: 'id'
        }
      },
      name: {
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
          model: 'User',
          key: 'id'
        }
      },
      restoredBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      updatedBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      restoredAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

    // CITY
    await queryInterface.createTable('City', {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      districtId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'District',
          key: 'id'
        }
      },
      name: {
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
          model: 'User',
          key: 'id'
        }
      },
      restoredBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      updatedBy: {
        type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      restoredAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("City");
    await queryInterface.dropTable("District");
    await queryInterface.dropTable("State");
  }
};
