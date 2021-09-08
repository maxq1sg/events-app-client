import { Request, Response } from "express";
import { ICreateEvent, IModifyEvent } from "./dtos/create.event";
import EventService from "./event.service";

class EventController {
  private eventService: EventService;
  constructor() {
    this.eventService = new EventService();
  }
  createEvent = async (req: Request, res: Response) => {
    const { owner_id, body }: ICreateEvent = req.body;
    const newEvent = await this.eventService.createEvent({
      owner_id,
      body,
    });
    res.json(newEvent);
  };
  modifyEvent = async (req: Request, res: Response) => {
    const { id, body }: IModifyEvent = req.body;
    const modifiedEvent = await this.eventService.modifyEvent(id, body);
    res.json(modifiedEvent);
  };
  getEventSubs = async (req: Request, res: Response) => {
    const { id } = req.params;
    const eventSubs = await this.eventService.getEventSubscribers(+id);
    res.json(eventSubs);
  };
  getSinglEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const event = await this.eventService.getSingleEvent(+id);
    res.json(event);
  };
  searchEvents = async (req: Request, res: Response) => {
    const { query } = req.body;
    const results = await this.eventService.searchEvents(query);
    res.json(results);
  };
}
export default new EventController();
