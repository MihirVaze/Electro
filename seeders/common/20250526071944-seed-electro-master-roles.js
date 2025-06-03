'use strict';

module.exports = {
    up: async ({ context }) => {
        const { queryInterface, Sequelize, schema } = context;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const { v4: UUIDV4 } = require('uuid');
            await queryInterface.bulkInsert(
                { tableName: 'Role', schema },
                [
                    {
                        id: 'fd05460c-99d5-480c-9597-b780d2a1fd95',
                        role: 'superadmin',
                    },
                    {
                        id: 'b86f4c94-d9d8-4115-bd54-038a577e467a',
                        role: 'client_manager',
                    },
                    {
                        id: '8c9462f7-f1ef-4cc1-8713-034930f303f4',
                        role: 'state_manager',
                    },
                    {
                        id: 'a5f2dd11-8220-4e8c-bf52-779822c28fce',
                        role: 'district_manager',
                    },
                    {
                        id: '501586ac-762b-4a2b-b7bf-80e1e114db9b',
                        role: 'city_manager',
                    },
                    {
                        id: '77e801c6-11fc-42c5-ac66-d9e5c546fb8b',
                        role: 'worker',
                    },
                    {
                        id: '9b7038ab-ca52-4f89-bb2d-008a5262a807',
                        role: 'client_admin',
                    },
                    {
                        id: 'ad769c24-0da3-40cf-b7e9-ea85e0123878',
                        role: 'customer',
                    },
                    {
                        id: '56ec84bd-829a-4e61-b4bf-92a789d12a94',
                        role: 'service_worker',
                    },
                ],
                { transaction },
            );
            await transaction.commit();
        } catch (error) {
            console.log(error);
            console.log('..........Rolling Back Transaction..........');
            await transaction.rollback();
            console.log('.........Transaction Rolled Back..........');
        }
    },

    down: async ({ context }) => {
        const { queryInterface, Sequelize, schema } = context;
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkDelete(
                { tableName: 'Role', schema },
                null,
                { transaction },
            );
            await transaction.commit();
        } catch (error) {
            console.log(error);
            console.log('..........Rolling Back Transaction..........');
            await transaction.rollback();
            console.log('.........Transaction Rolled Back..........');
        }
    },
};
