'use strict'
const UUIDV4 = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

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
        references: {
          model: 'User',
          key: 'id'
        }
      },
      restoredAt: {
        type: DataTypes.DATE,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    });

    // await queryInterface.addConstraint("State", {
    //   fields: ["deletedBy"],
    //   type: "foreign key",
    //   name: "State_deletedBy_userId_fkey",
    //   references: {
    //     table: "User",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    // await queryInterface.addConstraint("State", {
    //   fields: ["restoredBy"],
    //   type: "foreign key",
    //   name: "State_restoredBy_userId_fkey",
    //   references: {
    //     table: "User",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    // await queryInterface.addConstraint("State", {
    //   fields: ["createdBy"],
    //   type: "foreign key",
    //   name: "State_createdBy_userId_fkey",
    //   references: {
    //     table: "User",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    // await queryInterface.addConstraint("State", {
    //   fields: ["updatedBy"],
    //   type: "foreign key",
    //   name: "State_updatedBy_userId_fkey",
    //   references: {
    //     table: "User",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    //DISTRICT
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
        references: {
          model: 'User',
          key: 'id'
        }
      },
      restoredAt: {
        type: DataTypes.DATE,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    });

    // await queryInterface.addConstraint("District", {
    //   fields: ["stateId"],
    //   type: "foreign key",
    //   name: "District_stateId_userId_fkey",
    //   references: {
    //     table: "State",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    // await queryInterface.addConstraint("District", {
    //   fields: ["deletedBy"],
    //   type: "foreign key",
    //   name: "District_deletedBy_userId_fkey",
    //   references: {
    //     table: "User",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    // await queryInterface.addConstraint("District", {
    //   fields: ["restoredBy"],
    //   type: "foreign key",
    //   name: "District_restoredBy_userId_fkey",
    //   references: {
    //     table: "User",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    // await queryInterface.addConstraint("District", {
    //   fields: ["createdBy"],
    //   type: "foreign key",
    //   name: "District_createdBy_userId_fkey",
    //   references: {
    //     table: "User",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    // await queryInterface.addConstraint("District", {
    //   fields: ["updatedBy"],
    //   type: "foreign key",
    //   name: "District_updatedBy_userId_fkey",
    //   references: {
    //     table: "User",
    //     field: "id",
    //   },
    //   unique: false,
    // });

    //CITY
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
        references: {
          model: 'User',
          key: 'id'
        }
      },
      restoredAt: {
        type: DataTypes.DATE,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    });

  //   await queryInterface.addConstraint("District", {
  //     fields: ["stateId"],
  //     type: "foreign key",
  //     name: "City_districtId_userId_fkey",
  //     references: {
  //       table: "District",
  //       field: "id",
  //     },
  //     unique: false,
  //   });

  //   await queryInterface.addConstraint("District", {
  //     fields: ["deletedBy"],
  //     type: "foreign key",
  //     name: "District_deletedBy_userId_fkey",
  //     references: {
  //       table: "User",
  //       field: "id",
  //     },
  //     unique: false,
  //   });

  //   await queryInterface.addConstraint("District", {
  //     fields: ["restoredBy"],
  //     type: "foreign key",
  //     name: "District_restoredBy_userId_fkey",
  //     references: {
  //       table: "User",
  //       field: "id",
  //     },
  //     unique: false,
  //   });

  //   await queryInterface.addConstraint("District", {
  //     fields: ["createdBy"],
  //     type: "foreign key",
  //     name: "District_createdBy_userId_fkey",
  //     references: {
  //       table: "User",
  //       field: "id",
  //     },
  //     unique: false,
  //   });

  //   await queryInterface.addConstraint("District", {
  //     fields: ["updatedBy"],
  //     type: "foreign key",
  //     name: "District_updatedBy_userId_fkey",
  //     references: {
  //       table: "User",
  //       field: "id",
  //     },
  //     unique: false,
  //   });
  },

  async down(queryInterface, Sequelize) {
    //STATE
    await queryInterface.removeConstraint("State", "deletedBy");
    await queryInterface.removeConstraint("State", "restoredBy");
    await queryInterface.removeConstraint("State", "createdBy");
    await queryInterface.removeConstraint("State", "updatedBy");
    await queryInterface.dropTable("State");
    //DISTRICT
    await queryInterface.removeConstraint("District", "StateId");
    await queryInterface.removeConstraint("District", "deletedBy");
    await queryInterface.removeConstraint("District", "restoredBy");
    await queryInterface.removeConstraint("District", "createdBy");
    await queryInterface.removeConstraint("District", "updatedBy");
    await queryInterface.dropTable("District");
    //CITY
    await queryInterface.removeConstraint("City", "DistrictId");
    await queryInterface.removeConstraint("City", "deletedBy");
    await queryInterface.removeConstraint("City", "restoredBy");
    await queryInterface.removeConstraint("City", "createdBy");
    await queryInterface.removeConstraint("City", "updatedBy");
    await queryInterface.dropTable("City")
  }
};