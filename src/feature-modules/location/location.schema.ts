import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { City, District, State } from './location.type';
import { sequelize } from '../../connections/pg.connection';
import { UserSchema } from '../user/user.schema';

export class StateSchema extends Model<State, State> {}

StateSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
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
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        restoredAt: {
            type: DataTypes.DATE,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'State',
        tableName: 'State',
    },
);

export class DistrictSchema extends Model<District, District> {}

DistrictSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        stateId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: StateSchema,
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
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        restoredAt: {
            type: DataTypes.DATE,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'District',
        tableName: 'District',
    },
);

export class CitySchema extends Model<City, City> {}

CitySchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        districtId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: DistrictSchema,
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
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
        restoredAt: {
            type: DataTypes.DATE,
            references: {
                model: UserSchema,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'City',
        tableName: 'City',
    },
);

StateSchema.hasMany(DistrictSchema, {
    foreignKey: 'stateId',
    sourceKey: 'id',
    as: 'district',
});

DistrictSchema.hasMany(CitySchema, {
    foreignKey: 'districtId',
    sourceKey: 'id',
    as: 'city',
});

DistrictSchema.belongsTo(StateSchema, {
    foreignKey: 'stateId',
    targetKey: 'id',
    as: 'state',
});
CitySchema.belongsTo(DistrictSchema, {
    foreignKey: 'districtId',
    targetKey: 'id',
    as: 'district',
});
