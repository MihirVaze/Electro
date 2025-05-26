module.exports = {
    async up({ context }) {
        const { queryInterface, Sequelize, schema } = context;

        const transaction = await queryInterface.sequelize.transaction();

        try {
            //STATE
            await queryInterface.createTable(
                { tableName: 'State', schema },
                {
                    id: {
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        primaryKey: true,
                    },
                    name: {
                        type: Sequelize.STRING,
                    },
                    isDeleted: {
                        type: Sequelize.BOOLEAN,
                        defaultValue: false,
                    },
                    deletedBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    restoredBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    createdBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    updatedBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    deletedAt: {
                        type: Sequelize.DATE,
                    },
                    restoredAt: {
                        type: Sequelize.DATE,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                },
            );

            // DISTRICT
            await queryInterface.createTable(
                { tableName: 'District', schema },
                {
                    id: {
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        primaryKey: true,
                    },
                    stateId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        references: {
                            model: 'State',
                            key: 'id',
                        },
                    },
                    name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    isDeleted: {
                        type: Sequelize.BOOLEAN,
                        defaultValue: false,
                    },
                    deletedBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    restoredBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    createdBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    updatedBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    deletedAt: {
                        type: Sequelize.DATE,
                    },
                    restoredAt: {
                        type: Sequelize.DATE,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                },
            );

            // CITY
            await queryInterface.createTable(
                { tableName: 'City', schema },
                {
                    id: {
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        primaryKey: true,
                    },
                    districtId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        references: {
                            model: 'District',
                            key: 'id',
                        },
                    },
                    name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    isDeleted: {
                        type: Sequelize.BOOLEAN,
                        defaultValue: false,
                    },
                    deletedBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    restoredBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    createdBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    updatedBy: {
                        type: Sequelize.UUID,
                        references: {
                            model: 'User',
                            key: 'id',
                        },
                    },
                    deletedAt: {
                        type: Sequelize.DATE,
                    },
                    restoredAt: {
                        type: Sequelize.DATE,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                },
            );
        } catch (error) {
            console.log(error);
            console.log('..........Rolling Back Transaction..........');
            await transaction.rollback();
            console.log('.........Transaction Rolled Back..........');
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
        }
    },
};
