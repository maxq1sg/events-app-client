import { Router } from "express";
import permissionsController from "./permissions.controller";
const router = Router();

router.post("/", permissionsController.addNewPermission);


export default router;
