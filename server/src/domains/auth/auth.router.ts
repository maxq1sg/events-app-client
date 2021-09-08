import { Router } from "express";
import asyncHandler from "express-async-handler";
import authController from "./auth.controller";

const router = Router();

router.post("/register", asyncHandler(authController.registerUser));
router.post("/login", asyncHandler(authController.loginUser));

export default router;
