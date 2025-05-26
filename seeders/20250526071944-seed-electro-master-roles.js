"use strict";

module.exports = {
	up: async ({ context }) => {
		const { queryInterface, Sequelize, schema } = context;
		const transaction = await queryInterface.sequelize.transaction();

		try {
			const { v4: UUIDV4 } = require("uuid")
			await queryInterface.bulkInsert(
				{ tableName: "Role", schema },
				[
					{ id: UUIDV4(), role: 'superadmin' },
					{ id: UUIDV4(), role: 'client_manager' },
					{ id: UUIDV4(), role: 'state_manager' },
					{ id: UUIDV4(), role: 'district_manager' },
					{ id: UUIDV4(), role: 'city_manager' },
					{ id: UUIDV4(), role: 'worker' },
					{ id: UUIDV4(), role: 'client_admin' }
				],
				{ transaction }
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
			await queryInterface.bulkDelete({ tableName: "Role", schema }, null, { transaction });
			await transaction.commit();
		} catch (error) {
			console.log(error);
			console.log('..........Rolling Back Transaction..........');
			await transaction.rollback();
			console.log('.........Transaction Rolled Back..........');
		}
	},
};