import { Request, Response, Router } from "express";
import EventService from "./event.service";
import "reflect-metadata";
// import { Router } from "express";

// const router = Router();

// router.post("/")

// export default router

class EventController {
  public router: Router;
  private eventService: EventService;
  constructor() {
    this.eventService = new EventService();
    this.router = Router();
    this.router.post("/", this.createEvent);
    this.router.get("/", (req: Request, res: Response) => {
      res.json({ mes: "max" });
    });
  }
  createEvent = async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const newEvent = await this.eventService.createEvent({
        name,
        description,
      });
      res.json(newEvent);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new EventController();
