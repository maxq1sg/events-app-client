import { EPermission } from "../permisssions/types";
import { Router } from "express";
import PermissionGuard from "../../middleware/PermissionGuard";
import userController from "./user.controller";
import protect from "../../middleware/AuthGuard";
import RoleGuard from "../../middleware/RoleGuard";
import { ERole } from "../roles/dto";
const router = Router();

router.post("/", userController.createUser);
router.post("/seed", userController.seedUsers);
router.get("/:id", userController.getEventsOfSingleUser);
router.delete("/:id", userController.deleteUserById);
router.get("/", userController.getAllUsers);

export default router;
