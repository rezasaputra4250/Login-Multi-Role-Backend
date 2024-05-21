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
        }
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Orders;
