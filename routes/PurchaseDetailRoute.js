import express from "express";
import {
    getPurchaseDetails,
    getPurchaseDetailById,
    createPurchaseDetail,
    updatePurchaseDetail,
    deletePurchaseDetail
} from "../controllers/PurchaseDetails.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/purchaseDetails', verifyUser, getPurchaseDetails);
router.get('/purchaseDetails/:id', verifyUser, getPurchaseDetailById);
router.post('/purchaseDetails', verifyUser, createPurchaseDetail);
router.patch('/purchaseDetails/:id', verifyUser, updatePurchaseDetail);
router.delete('/purchaseDetails/:id', verifyUser, deletePurchaseDetail);

export default router;
