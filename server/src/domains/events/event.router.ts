import { checkSchema } from "express-validator";
import { Router } from "express";
import { createEventSchema } from "./validation/createEventSchema";
import { modifyEventSchema } from "./validation/modifyEventSchema";
import AuthGuard from "../../middleware/AuthGuard";
import PermissionGuard from "../../middleware/PermissionGuard";
import { EPermission } from "../permisssions/types";


export default function initEventRouter(router: Router) {
  router.post(
    "/",
    AuthGuard,
    PermissionGuard(EPermission.CREATE_EVENT),
    checkSchema(createEventSchema),
    this.createEvent
  );
  router.post("/search", this.searchEvents);
  router.put(
    "/",
    AuthGuard,
    PermissionGuard(EPermission.MODIFY_EVENT_DETAILS),
    checkSchema(modifyEventSchema),
    this.modifyEvent
  );
  router.get("/:id", this.getSinglEvent);
  router.get("/:id/subs", this.getEventSubs);
}

