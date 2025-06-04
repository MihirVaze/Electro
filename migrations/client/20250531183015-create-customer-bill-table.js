module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const { DataTypes } = Sequelize;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.createTable(
                { tableName: 'CustomerBill', schema },
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    customerMeterId: {
                        type: DataTypes.UUID,
                        references: {
                            model: 'CustomerMeter',
                            key: 'id',
                        },
                        allowNull: false,
                    },
                    basePrice: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    perUnitCost: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    consumptionId: {
                        type: DataTypes.UUID,
                        references: {
                            model: 'Consumption',
                            key: 'id',
                        },
                        allowNull: false,
                    },
                    total: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    billingDate: {
                        type: DataTypes.DATE,
                        allowNull: false,
                        defaultValue: Date.now(),
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
                    },
                    restoredAt: {
                        type: DataTypes.DATE,
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
                tableName: 'CustomerBill',
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
