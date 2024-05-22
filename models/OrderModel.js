import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Customers from "./CustomerModel.js"; // Import model "Customers"

const { DataTypes } = Sequelize;

const Orders = db.define('orders', {
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customers,
            key: 'customerId'
        },
        validate: {
            notNull: {
                msg: "Customer ID tidak boleh kosong."
            }
        }
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Total Amount tidak boleh kosong."
            }
        }
    }
}, {
    freezeTableName: true
});

// Tambahkan hook beforeValidate
Orders.beforeValidate((order, options) => {
    console.log("Memvalidasi data pesanan...");
});

// Tambahkan hook afterValidate
Orders.afterValidate((order, options) => {
    console.log("Validasi data pesanan selesai.");
});

export default Orders;
