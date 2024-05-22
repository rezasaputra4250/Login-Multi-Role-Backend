import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Role = db.define('roles', {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Role name tidak boleh kosong."
            }
        }
    }
}, {
    freezeTableName: true
});

// Tambahkan hook beforeValidate
Role.beforeValidate((role, options) => {
    console.log("Memvalidasi data role...");
});

// Tambahkan hook afterValidate
Role.afterValidate((role, options) => {
    console.log("Validasi data role selesai.");
});

export default Role;
