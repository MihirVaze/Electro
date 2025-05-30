module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;
        const { DataTypes } = Sequelize;
        const transaction = await queryInterface.sequelize.transaction();

        try {
            //STATE
            await queryInterface.createTable(
                { tableName: 'State', schema },
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    name: {
                        type: DataTypes.STRING,
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
                        defaultValue: Date.now(),
                    },
                    updatedAt: {
                        type: DataTypes.DATE,
                        defaultValue: Date.now(),
                    },
                },
            );

            // DISTRICT
            await queryInterface.createTable(
                { tableName: 'District', schema },
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    stateId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        references: {
                            model: 'State',
                            key: 'id',
                        },
                    },
                    name: {
                        type: DataTypes.STRING,
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
            );

            // CITY
            await queryInterface.createTable(
                { tableName: 'City', schema },
                {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    districtId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        references: {
                            model: 'District',
                            key: 'id',
                        },
                    },
                    name: {
                        type: DataTypes.STRING,
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
            );
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
            await queryInterface.dropTable({ tableName: 'City', schema });
            await queryInterface.dropTable({ tableName: 'District', schema });
            await queryInterface.dropTable({ tableName: 'State', schema });
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
