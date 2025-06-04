'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeConstraint(
                { tableName: 'Consumption', schema },
                'Consumption_workerId_fkey',
                { transaction },
            );
            await queryInterface.addConstraint(
                { tableName: 'Consumption', schema },
                {
                    type: 'foreign key',
                    name: 'Consumption_workerId_fkey',
                    fields: ['workerId'],
                    references: {
                        table: 'User',
                        field: 'id',
                        schema: 'public',
                    },
                    transaction,
                },
            );
            return transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    },

    async down({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeConstraint(
                { tableName: 'Consumption', schema },
                'Consumption_workerId_fkey',
                { transaction },
            );
            await queryInterface.addConstraint(
                { tableName: 'Consumption', schema },
                {
                    type: 'foreign key',
                    name: 'Consumption_workerId_fkey',
                    fields: ['workerId'],
                    references: {
                        table: 'User',
                        field: 'id',
                        schema: 'public',
                    },
                    transaction,
                },
            );
            return transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    },
};
