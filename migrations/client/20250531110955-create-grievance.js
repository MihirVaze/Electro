module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const { DataTypes } = Sequelize;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.createTable(
                { tableName: 'Grievance', schema },
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    userId: {
                        type: DataTypes.UUID,
                    },
                    grievanceTypeId: {
                        type: DataTypes.UUID,
                    },
                    comments: {
                        type: DataTypes.STRING,
                        allowNull: true,
                    },
                    status: {
                        type: DataTypes.ENUM(
                            'pending',
                            'in-progress',
                            'resolved',
                        ),
                        defaultValue: 'pending',
                    },
                    assignedTo: {
                        type: DataTypes.UUID,
                        allowNull: true,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    escalatedTo: {
                        type: DataTypes.UUID,
                        allowNull: true,
                        references: {
                            model: 'Role',
                            key: 'id',
                        },
                    },
                    location: {
                        type: DataTypes.STRING,
                        allowNull: true,
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
                tableName: 'Grievance',
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
