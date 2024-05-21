import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Orders from "./OrderModel.js"; // Import model "Orders"
import Products from "./ProductModel.js"; // Import model "Products"

const { DataTypes } = Sequelize;

const OrderDetails = db.define('orderDetails', {
    orderDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: 'orderId'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'productId'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default OrderDetails;
