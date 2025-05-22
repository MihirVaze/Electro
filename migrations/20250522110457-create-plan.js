'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const { DataTypes } = Sequelize;
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable("Plan", {
				id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					primaryKey: true
				},
				minCustomers: {
					type: DataTypes.INTEGER,
					allowNull: false
				},
				maxCustomers: {
					type: DataTypes.INTEGER,
					allowNull: false
				},
				basePrice: {
					type: DataTypes.INTEGER,
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
				createdAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: Date.now(),
				},
				updatedAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: Date.now(),
				},
				deletedAt: {
					type: DataTypes.DATE,
					defaultValue: null,
				},
				restoredAt: {
					type: DataTypes.DATE,
					defaultValue: null
				}
			}, { transaction })

			await transaction.commit();

		} catch (error) {
			console.log(error);
			console.log('..........Rolling Back Transaction..........');
			await transaction.rollback();
			console.log('.........Transaction Rolled Back..........');
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable("Plan", { transaction });

			await transaction.commit()

		} catch (error) {
			console.log(error);
			console.log('..........Rolling Back Transaction..........');
			await transaction.rollback();
			console.log('.........Transaction Rolled Back..........');
		}
	}
};
