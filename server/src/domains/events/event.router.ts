import asyncHandler from "express-async-handler";
import { Router } from "express";
import eventController from "./event-controller";
const router = Router();

router.post("/", asyncHandler(eventController.createEvent));
router.post("/search", asyncHandler(eventController.searchEvents));
router.put("/", asyncHandler(eventController.modifyEvent));
router.get("/:id", asyncHandler(eventController.getSinglEvent));
router.get("/:id/subs", asyncHandler(eventController.getEventSubs));

export default router;
