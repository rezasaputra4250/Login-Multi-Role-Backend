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
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Role;
