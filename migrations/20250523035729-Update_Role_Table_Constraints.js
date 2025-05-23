'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Role', {
      fields: ['role'],
      type: 'unique',
      name: 'unique_role_constraint'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Role', 'unique_role_constraint');
  }
};
