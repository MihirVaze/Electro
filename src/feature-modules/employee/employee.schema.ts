import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../../connections/pg.connection";
import { Employee } from "../employee/employee.type"
import { UserSchema } from "../user/user.schema";
import { RoleSchema } from "../role/role.schema";

export class EmployeeSchema extends Model<Employee, Employee> { }

EmployeeSchema.init({
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
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: RoleSchema,
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
    modelName: 'Employee',
    tableName: 'Employee'
});

EmployeeSchema.belongsTo(RoleSchema, {
    foreignKey: 'role_id',
    targetKey: 'id',
    as: 'role'
});

RoleSchema.hasMany(EmployeeSchema, {
    foreignKey: 'role_id',
    sourceKey: 'id',
    as: 'employee'
});