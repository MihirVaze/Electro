const bcrypt = require('bcryptjs');
module.exports = {
    up: async ({ context }) => {
        const { queryInterface } = context;
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const salt = await bcrypt.genSalt(10);

            await queryInterface.bulkInsert(
                { tableName: 'User', schema: 'public' },
                [
                    {
                        id: '76f9bd37-efaa-4779-b092-0947ebf50373',
                        name: 'electro_super_admin',
                        email: 'electro@gmail.com',
                        phoneNo: '7017492168',
                        password: await bcrypt.hash('12345', salt),
                    },
                ],
                { transaction },
            );

            await queryInterface.bulkInsert(
                { tableName: 'UserRole', schema: 'public' },
                [
                    {
                        id: 'a272427d-ed12-4d41-b28c-e8299e88a553',
                        userId: '76f9bd37-efaa-4779-b092-0947ebf50373',
                        roleId: 'fd05460c-99d5-480c-9597-b780d2a1fd95',
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
                { tableName: 'UserRole', schema: 'public' },
                { id: 'a272427d-ed12-4d41-b28c-e8299e88a553' },
                { transaction },
            );

            await queryInterface.bulkDelete(
                { tableName: 'User', schema: 'public' },
                { id: '76f9bd37-efaa-4779-b092-0947ebf50373' },
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
