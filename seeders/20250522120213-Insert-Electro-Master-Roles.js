"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { v4: UUIDV4 } = require("uuid")
		await queryInterface.bulkInsert(
			"Role",
			[
				{ id: UUIDV4(), role: 'superadmin' },
				{ id: UUIDV4(), role: 'client_manager' },
				{ id: UUIDV4(), role: 'state_manager' },
				{ id: UUIDV4(), role: 'district_manager' },
				{ id: UUIDV4(), role: 'city_manager' },
				{ id: UUIDV4(), role: 'worker' },
				{ id: UUIDV4(), role: 'client_admin' }
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Role", null, {});
	},
};