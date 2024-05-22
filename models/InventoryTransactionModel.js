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
        },
        validate: {
            notNull: {
                msg: "Product ID tidak boleh kosong."
            }
        }
    },
    transactionDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
        allowNull: true,
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
    transactionType: {
        type: DataTypes.ENUM('IN', 'OUT'),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Jenis transaksi tidak boleh kosong."
            },
            isIn: {
                args: [['IN', 'OUT']],
                msg: "Jenis transaksi harus IN atau OUT."
            }
        }
    }
}, {
    freezeTableName: true
});

InventoryTransactions.addHook("beforeValidate", (transaction, options) => {
    console.log("Memvalidasi data transaksi inventaris...");
});

InventoryTransactions.addHook("afterValidate", (transaction, options) => {
    console.log("Validasi data transaksi inventaris selesai.");
});

export default InventoryTransactions;
