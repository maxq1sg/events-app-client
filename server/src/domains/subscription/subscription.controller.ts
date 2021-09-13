import { Router } from "express";
import { Service } from "typedi";
import Route from "../../middleware/RouteDecorator";
import { RequestPayload } from "../../middleware/types/MetaType";
import { SubscriptionDto } from "./dtos/subscription.dto";
import initSubscriptionRouter from "./subscription.router";
import SubscriptionService from "./subscription.service";

@Service()
class SubscriptionController {
  public router: Router;
  constructor(private readonly subService: SubscriptionService) {
    this.router = Router();
    initSubscriptionRouter.call(this, this.router);
  }

  @Route(["body"])
  async createSubscription(payload: RequestPayload) {
    const { userId, eventId }: SubscriptionDto = payload.body;
    const data = await this.subService.createSubscription({
      eventId,
      userId,
    });
    return data;
  }

  @Route(["body"])
  async cancelSubscription(payload: RequestPayload) {
    const { userId, eventId }: SubscriptionDto = payload.body;
    const data = await this.subService.cancelSubscription({
      eventId,
      userId,
    });
    return data;
  }
}
export default SubscriptionController;
