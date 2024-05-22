import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Customers = db.define('customers', {
    customerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Nama pelanggan tidak boleh kosong."
            }
        }
    },
    customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Email sudah digunakan."
        },
        validate: {
            notEmpty: {
                msg: "Email tidak boleh kosong."
            },
            isEmail: {
                msg: "Email tidak valid."
            }
        }
    },
    customerPhone: {
        type: DataTypes.STRING(20)
    }
}, {
    freezeTableName: true
});

Customers.addHook("beforeValidate", (customer, options) => {
    console.log("Memvalidasi data pelanggan...");
});

Customers.addHook("afterValidate", (customer, options) => {
    console.log("Validasi data pelanggan selesai.");
});

export default Customers;
