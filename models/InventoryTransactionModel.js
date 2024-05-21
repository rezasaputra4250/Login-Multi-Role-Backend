import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductModel.js"; // Import model "Products"

const { DataTypes } = Sequelize;

const InventoryTransactions = db.define('inventoryTransactions', {
    transactionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'productId'
        }
    },
    transactionDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transactionType: {
        type: DataTypes.ENUM('IN', 'OUT'),
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default InventoryTransactions;
