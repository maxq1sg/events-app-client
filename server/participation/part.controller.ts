import { Request, Response, Router } from "express";
import EventService from "./part.service";
import "reflect-metadata";
import UserService from "./part.service";
import { AddParticipation } from "./dtos/part.dto";
import PartService from "./part.service";
// import { Router } from "express";

// const router = Router();

// router.post("/")

// export default router

class PartController {
  public router: Router;
  private partService: PartService;
  constructor() {
    this.partService = new PartService();
    this.router = Router();
    this.router.post("/add", this.addParticipation);
  }
  addParticipation = async (req: Request, res: Response) => {
    try {
      const { userId, eventId }: AddParticipation = req.body;
      const isSuccessfull = await this.partService.createParticipation({
        eventId,
        userId,
      });
      res.json({ success: isSuccessfull });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new PartController();
