import { Request, Response } from "express";
import Route from "../../middleware/RouteDecorator";
import CustomRequest from "../../types/CustomRequest";
import { ICreateEvent, IModifyEvent } from "./dtos/create.event";
import EventService from "./event.service";

class EventController {
  private eventService: EventService;
  constructor() {
    this.eventService = new EventService();
  }

  @Route()
  async createEvent(req: Request, res: Response) {
    const { owner_id, body }: ICreateEvent = req.body;
    const newEvent = await this.eventService.createEvent({
      owner_id,
      body,
    });
    return newEvent;
  }

  @Route()
  async modifyEvent(req: CustomRequest, res: Response) {
    const { id, body }: IModifyEvent = req.body;
    const userFromToken = req?.user?.id
    const modifiedEvent = await this.eventService.modifyEvent(id, body,userFromToken);
    return modifiedEvent;
  }

  @Route()
  async getEventSubs(req: Request, res: Response) {
    const { id } = req.params;
    const eventSubs = await this.eventService.getEventSubscribers(+id);
    return eventSubs;
  }

  @Route()
  async getSinglEvent(req: Request, res: Response) {
    const { id } = req.params;
    const event = await this.eventService.getSingleEvent(+id);
    return event;
  }

  @Route()
  async searchEvents(req: Request, res: Response) {
    const { query } = req.body;
    const results = await this.eventService.searchEvents(query);
    return results;
  }
}
export default new EventController();
