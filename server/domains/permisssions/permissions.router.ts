import asyncHandler from "express-async-handler";
import { Router } from "express";
import permissionsController from "./permissions.controller";
const router = Router();

router.post("/", asyncHandler(permissionsController.addNewPermission));

export default router;
