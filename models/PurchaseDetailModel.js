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
        },
        validate: {
            notNull: {
                msg: "Purchase ID tidak boleh kosong."
            }
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'productId'
        },
        validate: {
            notNull: {
                msg: "Product ID tidak boleh kosong."
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Kuantitas tidak boleh kosong."
            }
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Harga tidak boleh kosong."
            }
        }
    }
}, {
    freezeTableName: true
});

// Tambahkan hook beforeValidate
PurchaseDetails.beforeValidate((purchaseDetail, options) => {
    console.log("Memvalidasi data detail pembelian...");
});

// Tambahkan hook afterValidate
PurchaseDetails.afterValidate((purchaseDetail, options) => {
    console.log("Validasi data detail pembelian selesai.");
});

export default PurchaseDetails;
