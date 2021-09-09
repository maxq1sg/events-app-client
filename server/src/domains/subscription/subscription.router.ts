import asyncHandler from "express-async-handler";
import { Router } from "express";
import subController from "./subscription.controller";
import AuthGuard from "../../middleware/AuthGuard";
import PermissionGuard from "../../middleware/PermissionGuard";
import { EPermission } from "../permisssions/types";

const router = Router();

router.post(
  "/add",
  AuthGuard,
  PermissionGuard(EPermission.EVENT_SUBSCRIPTION),
  asyncHandler(subController.createSubscription)
);
router.post(
  "/cancel",
  AuthGuard,
  PermissionGuard(EPermission.EVENT_SUBSCRIPTION),
  asyncHandler(subController.cancelSubscription)
);

export default router;
