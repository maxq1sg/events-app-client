import asyncHandler from "express-async-handler";
import { Router } from "express";
import rolesController from "./roles.controller";

const router = Router();

router.post("/new", asyncHandler(rolesController.addNewRole));
router.post(
  "/new_with_perm",
  asyncHandler(rolesController.createNewRoleWithPermissions)
);

router.post("/perm", asyncHandler(rolesController.addPermissionsToRole));
router.get("/:id", asyncHandler(rolesController.getPermissionsListToRole));

router.post("/seed", asyncHandler(rolesController.seedRoles));
router.delete("/", asyncHandler(rolesController.clearAllRoles));

export default router;
