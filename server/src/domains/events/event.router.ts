import asyncHandler from "express-async-handler";
import { Router } from "express";
import eventController from "./event-controller";
import AuthGuard from "../../middleware/AuthGuard";
import PermissionGuard from "../../middleware/PermissionGuard";
import { EPermission } from "../permisssions/types";
const router = Router();

router.post("/",AuthGuard, PermissionGuard(EPermission.CREATE_EVENT), asyncHandler(eventController.createEvent));
router.post("/search", asyncHandler(eventController.searchEvents));
router.put("/", asyncHandler(eventController.modifyEvent));
router.get("/:id", asyncHandler(eventController.getSinglEvent));
router.get("/:id/subs", asyncHandler(eventController.getEventSubs));

export default router;
