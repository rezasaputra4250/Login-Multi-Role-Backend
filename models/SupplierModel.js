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
            notEmpty: {
                msg: "Nama supplier tidak boleh kosong."
            }
        }
    },
    supplierEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Email supplier sudah digunakan."
        },
        validate: {
            notEmpty: {
                msg: "Email supplier tidak boleh kosong."
            },
            isEmail: {
                msg: "Email tidak valid."
            }
        }
    },
    supplierPhone: {
        type: DataTypes.STRING(20)
    }
}, {
    freezeTableName: true
});

// Tambahkan hook beforeValidate
Suppliers.beforeValidate((supplier, options) => {
    console.log("Memvalidasi data supplier...");
});

// Tambahkan hook afterValidate
Suppliers.afterValidate((supplier, options) => {
    console.log("Validasi data supplier selesai.");
});

export default Suppliers;
