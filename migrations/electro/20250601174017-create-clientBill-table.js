module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const { DataTypes } = Sequelize;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.createTable(
                { tableName: 'ClientBill', schema },
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },

                    basePrice: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    total: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    billingDate: {
                        type: DataTypes.DATE,
                        allowNull: false,
                        defaultValue: DataTypes.NOW(),
                    },
                    dueDate: {
                        type: DataTypes.DATE,
                        allowNull: false,
                    },
                    status: {
                        type: DataTypes.ENUM(),
                        values: ['unpaid', 'paid'],
                        defaultValue: 'unpaid',
                    },
                    clientId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'User',
                                schema: 'public',
                            },
                        },
                    },
                    planId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Plan',
                                schema: 'public',
                            },
                        },
                    },
                    discountId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Discount',
                                schema: 'public',
                            },
                        },
                    },
                    discountType: {
                        type: DataTypes.ENUM('increment', 'decrement', 'none'),
                        allowNull: false,
                    },
                    discountValue: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    isDeleted: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                    },
                    deletedBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    restoredBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    createdBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    updatedBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    deletedAt: {
                        type: DataTypes.DATE,
                        defaultValue: null,
                    },
                    restoredAt: {
                        type: DataTypes.DATE,
                        defaultValue: null,
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
                tableName: 'ClientBill',
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
