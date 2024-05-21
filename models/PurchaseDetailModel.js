import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Purchases from "./PurchaseModel.js"; // Import model "Purchases"
import Products from "./ProductModel.js"; // Import model "Products"

const { DataTypes } = Sequelize;

const PurchaseDetails = db.define('purchaseDetails', {
    purchaseDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Purchases,
            key: 'purchaseId'
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

export default PurchaseDetails;
