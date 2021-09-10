import { Request, Response, Router } from "express";
import Route from "../../middleware/RouteDecorator";
import { SubscriptionDto } from "./dtos/subscription.dto";
import SubService from "./subscription.service";

class SubscriptionController {
  private subService: SubService;
  constructor() {
    this.subService = new SubService();
  }
  
  @Route()
  async createSubscription (req: Request, res: Response) {
    const { userId, eventId }: SubscriptionDto = req.body;
    const data = await this.subService.createSubscription({
      eventId,
      userId,
    });
    res.json(data);
  };
  
  @Route()
  async cancelSubscription (req: Request, res: Response) {
    const { userId, eventId }: SubscriptionDto = req.body;
    const data = await this.subService.cancelSubscription({
      eventId,
      userId,
    });
    res.json(data);
  };
}
export default new SubscriptionController();
