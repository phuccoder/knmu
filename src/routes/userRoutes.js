// userRoutes.js
import express from "express";
import { getAllUsers } from "../controllers/usersController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);

export default router;