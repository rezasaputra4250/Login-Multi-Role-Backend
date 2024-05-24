import express from "express";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersWithCustomers // Fungsi yang ditambahkan
} from "../controllers/Orders.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/orders', verifyUser, getOrders);
router.get('/orders/:id', verifyUser, getOrderById);
router.post('/orders', verifyUser, createOrder);
router.patch('/orders/:id', verifyUser, updateOrder);
router.delete('/orders/:id', verifyUser, deleteOrder);

// Endpoint untuk mengambil pesanan dengan informasi pelanggan terkait
router.get('/orders-with-customers', verifyUser, getOrdersWithCustomers);

export default router;
