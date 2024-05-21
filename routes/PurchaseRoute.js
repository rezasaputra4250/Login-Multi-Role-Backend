import express from "express";
import {
    getPurchases,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase
} from "../controllers/Purchases.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/purchases', verifyUser, getPurchases);
router.get('/purchases/:id', verifyUser, getPurchaseById);
router.post('/purchases', verifyUser, createPurchase);
router.patch('/purchases/:id', verifyUser, updatePurchase);
router.delete('/purchases/:id', verifyUser, deletePurchase);

export default router;
