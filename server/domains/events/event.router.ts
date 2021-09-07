import { Router } from "express";
import eventController from "./event-controller";
const router = Router();

router.post("/", eventController.createEvent);
router.post("/search", eventController.createEvent);
router.put("/", eventController.modifyEvent);
router.get("/:id/subs", eventController.getEventSubs);

export default router;
