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
        },
        validate: {
            notNull: {
                msg: "Supplier ID tidak boleh kosong."
            }
        }
    },
    purchaseDate: {
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
Purchases.beforeValidate((purchase, options) => {
    console.log("Memvalidasi data pembelian...");
});

// Tambahkan hook afterValidate
Purchases.afterValidate((purchase, options) => {
    console.log("Validasi data pembelian selesai.");
});

export default Purchases;
