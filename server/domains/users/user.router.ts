import { Router } from "express";
import userController from "./user.controller";
import asyncHandler from "express-async-handler";

const router = Router();

router.post("/", asyncHandler(userController.createUser));
router.post("/seed", asyncHandler(userController.seedUsers));
router.get("/:id", asyncHandler(userController.getEventsOfSingleUser));
router.delete("/:id", asyncHandler(userController.deleteUserById));
router.get("/", asyncHandler(userController.getAllUsers));

export default router;
