'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const { DataTypes } = Sequelize;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.createTable(
                { tableName: 'Meter', schema },
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    name: {
                        type: DataTypes.STRING,
                        allowNull: true,
                    },
                    image: {
                        type: DataTypes.STRING,
                        allowNull: true,
                    },
                    basePrice: {
                        type: DataTypes.DECIMAL,
                        allowNull: true,
                    },
                    pricePerUnit: {
                        type: DataTypes.DECIMAL,
                        allowNull: true,
                    },
                    requiredPhotos: {
                        type: DataTypes.DECIMAL,
                        allowNull: true,
                    },
                    isDeleted: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                        allowNull: true,
                    },
                    deletedBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: {
                                tableName: 'User',
                                schema: 'public'
                            },
                        },
                        key: 'id'
                    },
                    restoredBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: {
                                tableName: 'User',
                                schema: 'public'
                            },
                        },
                        key: 'id'
                    },
                    createdBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: {
                                tableName: 'User',
                                schema: 'public'
                            },
                        },
                        key: 'id'
                    },
                    updatedBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: {
                                tableName: 'User',
                                schema: 'public'
                            },
                        },
                        key: 'id'
                    },
                    deletedAt: {
                        type: DataTypes.DATE,
                    },
                    restoredAt: {
                        type: DataTypes.DATE,
                    },
                    createdAt: {
                        type: DataTypes.DATE,
                        defaultValue: Date.now(),
                    },
                    updatedAt: {
                        type: DataTypes.DATE,
                        defaultValue: Date.now(),
                    },
                },
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

    async down({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.dropTable({
                tableName: 'Meter',
                schema,
            });

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
