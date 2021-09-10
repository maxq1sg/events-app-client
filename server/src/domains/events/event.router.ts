import asyncHandler from "express-async-handler";
import { Router } from "express";
import eventController from "./event-controller";
import AuthGuard from "../../middleware/AuthGuard";
import PermissionGuard from "../../middleware/PermissionGuard";
import { EPermission } from "../permisssions/types";
const router = Router();

router.post(
  "/",
  AuthGuard,
  PermissionGuard(EPermission.CREATE_EVENT),
  eventController.createEvent
);
router.post("/search", eventController.searchEvents);
router.put(
  "/",
  AuthGuard,
  PermissionGuard(EPermission.MODIFY_EVENT_DETAILS),
  eventController.modifyEvent
);
router.get("/:id", eventController.getSinglEvent);
router.get("/:id/subs", eventController.getEventSubs);

export default router;
