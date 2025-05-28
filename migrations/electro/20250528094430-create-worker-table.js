module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const { DataTypes } = Sequelize;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.createTable(
                { tableName: 'Worker', schema },
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    workerName: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    userId: {
                        type: DataTypes.UUID,
                        references: {
                            model: UserSchema,
                            key: 'id',
                        },
                        allowNull: false,
                    },
                    cityId: {
                        type: DataTypes.UUID,
                        references: {
                            model: CitySchema,
                            key: 'id',
                        },
                        allowNull: false,
                    },
                    isDeleted: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                    },
                    deletedBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: UserSchema,
                            key: 'id',
                        },
                    },
                    restoredBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: UserSchema,
                            key: 'id',
                        },
                    },
                    createdBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: UserSchema,
                            key: 'id',
                        },
                    },
                    updatedBy: {
                        type: DataTypes.UUID,
                        references: {
                            model: UserSchema,
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
            await queryInterface.dropTable({ tableName: 'Worker', schema });

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
