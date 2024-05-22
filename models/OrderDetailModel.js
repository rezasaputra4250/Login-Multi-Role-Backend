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
        },
        validate: {
            notNull: {
                msg: "Order ID tidak boleh kosong."
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
OrderDetails.beforeValidate((orderDetail, options) => {
    console.log("Memvalidasi data detail pesanan...");
});

// Tambahkan hook afterValidate
OrderDetails.afterValidate((orderDetail, options) => {
    console.log("Validasi data detail pesanan selesai.");
});

export default OrderDetails;
