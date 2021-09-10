import asyncHandler from "express-async-handler";
import { Router } from "express";
import rolesController from "./roles.controller";

const router = Router();

router.post("/new", rolesController.addNewRole);
router.post("/new_with_perm", rolesController.createNewRoleWithPermissions);

//fix - to perm.route
router.post("/add_perm", rolesController.addPermissionsToRole);
router.get("/", rolesController.getAllRolesWithPermissions);
router.post("/seed", rolesController.seedRoles);
router.delete("/", rolesController.clearAllRoles);
router.put("/", rolesController.changeAllRoles);
router.get("/:id/list", rolesController.getPermissionsListToRole);

export default router;
