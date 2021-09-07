import { Router } from "express";
import rolesController from "./roles.controller";


const router = Router();

router.post("/new", rolesController.addNewRole);
router.post("/new_with_perm", rolesController.createNewRoleWithPermissions);

router.post("/perm", rolesController.addPermissionsToRole);
router.get("/:id", rolesController.getPermissionsListToRole);

export default router;
