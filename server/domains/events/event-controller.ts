import { Request, Response } from "express";
import { IModifyEvent } from "./dtos/create.event";
import EventService from "./event.service";

class EventController {
  private eventService: EventService;
  constructor() {
    this.eventService = new EventService();
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
  modifyEvent = async (req: Request, res: Response) => {
    try {
      const { id, body }: IModifyEvent = req.body;
      const modifiedEvent = await this.eventService.modifyEvent(id, body);
      res.json(modifiedEvent);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  getEventSubs = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const eventSubs = await this.eventService.getEventSubscribers(+id);
      res.json(eventSubs);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new EventController();
