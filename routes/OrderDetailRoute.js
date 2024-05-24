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

router.get('/ordersdetails', getOrderDetails);
router.get('/ordersdetails/:id', getOrderDetailById);
router.post('/ordersdetails', createOrderDetail);
router.patch('/ordersdetails/:id', updateOrderDetail);
router.delete('/ordersdetails/:id', deleteOrderDetail);

export default router;
