import express from "express"
import { authenticateToken, verifyOwnership } from "../../middleware/auth";
import userController from "../../controller/users/userController";

const router = express.Router();

router.get('/:id', authenticateToken, userController.getUser);
router.put('/:id', authenticateToken, verifyOwnership, userController.updateUser);
router.put('/:id/opt-in', authenticateToken, userController.updateOptIn);

export default router;