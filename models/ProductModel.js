import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Products = db.define('products', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Nama produk tidak boleh kosong."
            }
        }
    },
    productDescription: {
        type: DataTypes.TEXT
    },
    productPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Harga produk tidak boleh kosong."
            }
        }
    },
    productStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Stok produk tidak boleh kosong."
            }
        }
    }
}, {
    freezeTableName: true
});

// Tambahkan hook beforeValidate
Products.beforeValidate((product, options) => {
    console.log("Memvalidasi data produk...");
});

// Tambahkan hook afterValidate
Products.afterValidate((product, options) => {
    console.log("Validasi data produk selesai.");
});

export default Products;
