import { Router } from "express";
import userController from "./user.controller";
import AuthGuard from "./../../middleware/AuthGuard";
import PermissionGuard from "./../../middleware/PermissionGuard";
import { EPermission } from "./../../domains/permisssions/types";

const router = Router();

router.post("/", userController.createUser);
router.post("/seed", userController.seedUsers);
router.get("/:id", AuthGuard, userController.getEventsOfSingleUser);
router.delete("/:id", userController.deleteUserById);
router.get(
  "/",
  AuthGuard,
  PermissionGuard(EPermission.SHOW_USERS_LIST),
  userController.getAllUsers
);

export default router;
