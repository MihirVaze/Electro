const bcrypt = require('bcryptjs');
module.exports = {
    up: async ({ context }) => {
        const { queryInterface } = context;
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const { v4: UUIDV4 } = require('uuid');

            await queryInterface.bulkInsert(
                { tableName: 'Plan', schema: 'public' },
                [
                    {
                        id: UUIDV4(),
                        minCustomers: 1,
                        maxCustomers: 20,
                        basePrice: 1000,
                    },
                    {
                        id: UUIDV4(),
                        minCustomers: 21,
                        maxCustomers: 40,
                        basePrice: 2000,
                    },
                    {
                        id: UUIDV4(),
                        minCustomers: 41,
                        maxCustomers: 60,
                        basePrice: 3000,
                    },
                    {
                        id: UUIDV4(),
                        minCustomers: 61,
                        maxCustomers: 80,
                        basePrice: 4000,
                    },
                ],
                { transaction },
            );

            await transaction.commit();
        } catch (error) {
            console.error(error);
            console.log('..........Rolling Back Transaction..........');
            await transaction.rollback();
            console.log('.........Transaction Rolled Back..........');
        }
    },

    down: async ({ context }) => {
        const { queryInterface } = context;
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkDelete(
                { tableName: 'Plan', schema: 'public' },
                { transaction },
            );

            await transaction.commit();
        } catch (error) {
            console.error(error);
            console.log('..........Rolling Back Transaction..........');
            await transaction.rollback();
            console.log('.........Transaction Rolled Back..........');
        }
    },
};
