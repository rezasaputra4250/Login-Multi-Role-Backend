import express from "express";
import {
    getInventoryTransactions,
    getInventoryTransactionById,
    createInventoryTransaction,
    updateInventoryTransaction,
    deleteInventoryTransaction
} from "../controllers/InventoryTransactions.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/inventoryTransactions', verifyUser, getInventoryTransactions);
router.get('/inventoryTransactions/:id', verifyUser, getInventoryTransactionById);
router.post('/inventoryTransactions', verifyUser, createInventoryTransaction);
router.patch('/inventoryTransactions/:id', verifyUser, updateInventoryTransaction);
router.delete('/inventoryTransactions/:id', verifyUser, deleteInventoryTransaction);

export default router;
