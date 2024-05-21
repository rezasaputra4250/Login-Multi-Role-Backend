import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Suppliers = db.define('suppliers', {
    supplierId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supplierName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    supplierEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    supplierPhone: {
        type: DataTypes.STRING(20)
    }
}, {
    freezeTableName: true
});

export default Suppliers;
