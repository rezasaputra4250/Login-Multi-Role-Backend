import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Suppliers from "./SupplierModel.js"; // Import model "Suppliers"

const { DataTypes } = Sequelize;

const Purchases = db.define('purchases', {
    purchaseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Suppliers,
            key: 'supplierId'
        }
    },
    purchaseDate: {
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

export default Purchases;
