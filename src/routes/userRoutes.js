// userRoutes.js
import express from "express";
import { getAllUsers, getTotalUsers, updateUserById } from "../controllers/usersController.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);

router.get("/totalUsers", getTotalUsers);

router.put("/:id", updateUserById);

export default router;