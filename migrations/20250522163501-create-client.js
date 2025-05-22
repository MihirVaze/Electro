'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const { DataTypes } = Sequelize;
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('Client', {
				id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					primaryKey: true,
				},
				clientName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				schemaName: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				userId: {
					type: DataTypes.UUID,
					allowNull: false,
					references: {
						model: 'User',
						key: 'id',
					}
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
				deletedAt: {
					type: DataTypes.DATE,
					defaultValue: null,
				},
				restoredAt: {
					type: DataTypes.DATE,
					defaultValue: null
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
				}
			}, { transaction });

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
			await queryInterface.dropTable('Client', { transaction });
			
			await transaction.commit();
		} catch (error) {
			console.log(error);
			console.log('..........Rolling Back Transaction..........');
			await transaction.rollback();
			console.log('.........Transaction Rolled Back..........');
		}
	}
};

