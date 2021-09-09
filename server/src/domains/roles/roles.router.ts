import asyncHandler from "express-async-handler";
import { Router } from "express";
import rolesController from "./roles.controller";

const router = Router();

router.post("/new", asyncHandler(rolesController.addNewRole));
router.post(
  "/new_with_perm",
  asyncHandler(rolesController.createNewRoleWithPermissions)
);

//fix - to perm.route
router.post("/add_perm", asyncHandler(rolesController.addPermissionsToRole));
router.get("/", asyncHandler(rolesController.getAllRolesWithPermissions));
router.post("/seed", asyncHandler(rolesController.seedRoles));
router.delete("/", asyncHandler(rolesController.clearAllRoles));
router.put("/",asyncHandler(rolesController.changeAllRoles))
router.get("/:id/list", asyncHandler(rolesController.getPermissionsListToRole));


export default router;
