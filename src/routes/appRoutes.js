import express from "express";
import userRoutes from "./userRoutes.js";
import userEventRoutes from "./userEventRoutes.js";
import authRoutes from "./authRoutes.js";


const router = express.Router();

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

router.use("/userEvents", userEventRoutes);


export default router;
