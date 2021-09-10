import { loginSchema, registrationSchema } from "./validation/index";
import { Router } from "express";
import { body, checkSchema } from "express-validator";
import authController from "./auth.controller";
import RouteDecorator from "../../middleware/RouteDecorator";

const router = Router();

router.post(
  "/register",
  checkSchema(registrationSchema),
  authController.registerUser
);
router.post("/login", checkSchema(loginSchema), authController.loginUser);

export default router;
