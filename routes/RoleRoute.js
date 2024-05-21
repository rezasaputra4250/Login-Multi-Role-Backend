import express from "express";
import {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} from "../controllers/Roles.js"; // Mengimpor fungsi controller yang sesuai
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/roles', verifyUser, getRoles);
router.get('/roles/:id', verifyUser, getRoleById);
router.post('/roles', verifyUser, createRole);
router.patch('/roles/:id', verifyUser, updateRole);
router.delete('/roles/:id', verifyUser, deleteRole);

export default router;
