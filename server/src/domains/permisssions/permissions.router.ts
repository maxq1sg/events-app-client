import asyncHandler from "express-async-handler";
import { Router } from "express";
import permissionsController from "./permissions.controller";
const router = Router();

router.post("/seed", permissionsController.seedPermissions);
router.post("/", permissionsController.addNewPermission);

export default router;
