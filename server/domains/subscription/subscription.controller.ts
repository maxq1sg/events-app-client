import { Request, Response, Router } from "express";
import { SubscriptionDto } from "./dtos/subscription.dto";
import SubService from "./subscription.service";

class SubscriptionController {
  private subService: SubService;
  constructor() {
    this.subService = new SubService();
  }
  createSubscription = async (req: Request, res: Response) => {
    try {
      const { userId, eventId }: SubscriptionDto = req.body;
      const data = await this.subService.createSubscription({
        eventId,
        userId,
      });
      res.json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  cancelSubscription = async (req: Request, res: Response) => {
    try {
      const { userId, eventId }: SubscriptionDto = req.body;
      const data = await this.subService.cancelSubscription({
        eventId,
        userId,
      });
      res.json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new SubscriptionController();
