import asyncHandler from 'express-async-handler';
import { Router } from "express";
import subController from "./subscription.controller";

const router = Router();

router.post("/add", asyncHandler(subController.createSubscription));
router.post("/cancel", asyncHandler(subController.cancelSubscription));


export default router;
