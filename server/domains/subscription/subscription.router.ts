import { Router } from "express";
import subController from "./subscription.controller";

const router = Router();

router.post("/add", subController.createSubscription);
router.post("/cancel", subController.cancelSubscription);


export default router;
