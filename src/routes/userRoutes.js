// userRoutes.js
import express from "express";
import { getAllUsers, getTotalUsers, updateUserById, getFilteredUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);

router.get("/totalUsers", getTotalUsers);

router.put("/:id", updateUserById);

router.get("/filter", getFilteredUsers);

export default router;