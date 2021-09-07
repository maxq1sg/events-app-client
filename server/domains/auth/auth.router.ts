import { Router } from "express";
import authController from "./auth.controller";
const router = Router();

router.post("/reg", authController.registerUser);
router.post("/login", authController.loginUser);

export default router;
