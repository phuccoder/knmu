import express from "express";

import authController from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signin", authController.signIn);

export default router;
