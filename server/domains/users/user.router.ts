import { Router } from "express";
import userController from "./user.controller";
import asyncHandler from "express-async-handler";
import AuthGuard from "./../../middleware/AuthGuard";
import PermissionGuard from "./../../middleware/PermissionGuard";
import { EPermission } from "./../../domains/permisssions/types";

const router = Router();

router.post("/", asyncHandler(userController.createUser));
router.post("/seed", asyncHandler(userController.seedUsers));
router.get("/:id", asyncHandler(userController.getEventsOfSingleUser));
router.delete("/:id", asyncHandler(userController.deleteUserById));
router.get(
  "/",
  AuthGuard,
  PermissionGuard(EPermission.USERS_LIST),
  asyncHandler(userController.getAllUsers)
);

export default router;
