module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const { DataTypes } = Sequelize;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.addColumn(
                { tableName: 'Consumption', schema },
                'createdAt',
                {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Date.now(),
                },
                'updatedAt',
                {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Date.now(),
                },
                { transaction },
            );

            await transaction.commit();
        } catch (error) {
            console.error(error);
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
            await queryInterface.removeColumn(
                { tableName: 'Consumption', schema },
                'createdAt',
                'updatedAt',
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
};
