import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../../connections/pg.connection";
import { CityUser, DistrictUser, StateUser } from "./userLocation.type"
import { UserSchema } from "../user/user.schema";
import { CitySchema, DistrictSchema, StateSchema } from "../location/location.schema";


export class StateUserSchema extends Model<StateUser, StateUser>{}

StateUserSchema.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    stateId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: StateSchema,
            key: 'id'
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    restoredBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    createdBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
    restoredAt: {
        type: DataTypes.DATE,        
    }
}, {
    sequelize: sequelize,
    modelName: 'StateUser',
    tableName: 'StateUser'
});

StateUserSchema.belongsTo(UserSchema, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'User'
});

UserSchema.hasMany(StateUserSchema, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'stateUser'
});


export class DistrictUserSchema extends Model<DistrictUser, DistrictUser>{}

DistrictUserSchema.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    districtId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: DistrictSchema,
            key: 'id'
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    restoredBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    createdBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
    restoredAt: {
        type: DataTypes.DATE,        
    }
}, {
    sequelize: sequelize,
    modelName: 'DistrictUser',
    tableName: 'DistrictUser'
});

DistrictUserSchema.belongsTo(UserSchema, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'User'
});

UserSchema.hasMany(DistrictUserSchema, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'districtUser'
});


export class CityUserSchema extends Model<CityUser, CityUser>{}

CityUserSchema.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    cityId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: CitySchema,
            key: 'id'
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    restoredBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    createdBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.UUID,
        references: {
            model: UserSchema,
            key: 'id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
    restoredAt: {
        type: DataTypes.DATE,        
    }
}, {
    sequelize: sequelize,
    modelName: 'CityUser',
    tableName: 'CityUser'
});

CityUserSchema.belongsTo(UserSchema, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'User'
});

UserSchema.hasMany(CityUserSchema, {
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'cityUser'
});

