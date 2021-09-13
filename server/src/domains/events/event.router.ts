import { checkSchema } from "express-validator";
import asyncHandler from "express-async-handler";
import { Router } from "express";
import eventController from "./event-controller";
import AuthGuard from "../../middleware/AuthGuard";
import PermissionGuard from "../../middleware/PermissionGuard";
import { EPermission } from "../permisssions/types";
import { createEventSchema } from "./validation/createEventSchema";
import { modifyEventSchema } from "./validation/modifyEventSchema";
const router = Router();

router.post(
  "/",
  // AuthGuard,
  // PermissionGuard(EPermission.CREATE_EVENT),
  checkSchema(createEventSchema),
  eventController.createEvent
);
router.post("/search", eventController.searchEvents);
router.put(
  "/",
  // AuthGuard,
  // PermissionGuard(EPermission.MODIFY_EVENT_DETAILS),
  checkSchema(modifyEventSchema),
  eventController.modifyEvent
);
router.get("/:id", eventController.getSinglEvent);
router.get("/:id/subs", eventController.getEventSubs);

export default router;
