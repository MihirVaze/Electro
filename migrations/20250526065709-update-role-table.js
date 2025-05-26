module.exports = {
  async up({ context }) {

    const { queryInterface, Sequelize, schema } = context;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addConstraint({ tableName: 'Role', schema }, {
        fields: ['role'],
        type: 'unique',
        name: 'unique_role_constraint'
      },{transaction});

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
      await queryInterface.removeConstraint({tableName:'Role',schema}, 'unique_role_constraint');

      await transaction.commit()
    } catch (error) {
      console.log(error);
      console.log('..........Rolling Back Transaction..........');
      await transaction.rollback();
      console.log('.........Transaction Rolled Back..........');
    }
  }
}