import express from "express";
import {
    getOrderDetails,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} from "../controllers/OrderDetails.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/orderDetails', verifyUser, getOrderDetails);
router.get('/orderDetails/:id', verifyUser, getOrderDetailById);
router.post('/orderDetails', verifyUser, createOrderDetail);
router.patch('/orderDetails/:id', verifyUser, updateOrderDetail);
router.delete('/orderDetails/:id', verifyUser, deleteOrderDetail);

export default router;
