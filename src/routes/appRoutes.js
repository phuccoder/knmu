import express from "express";
import userRoutes from "./userRoutes.js";
import userEventRoutes from "./userEventRoutes.js";
import authRoutes from "./authRoutes.js";
import userGiftRoutes from "./userGiftRoutes.js";


const router = express.Router();

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

router.use("/userEvents", userEventRoutes);

router.use("/userGifts", userGiftRoutes);


export default router;
