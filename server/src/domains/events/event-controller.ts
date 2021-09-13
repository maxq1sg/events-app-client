import { Router } from "express";
import { Service } from "typedi";
import Route from "../../middleware/RouteDecorator";
import { RequestPayload } from "../../middleware/types/MetaType";
import { ICreateEvent, IModifyEvent } from "./dtos/create.event";
import initEventRouter from "./event.router";
import EventService from "./event.service";

@Service()
class EventController {
  public router: Router;
  constructor(private readonly eventService: EventService) {
    this.router = Router();
    initEventRouter.call(this, this.router);
  }

  @Route(["query"])
  getAllEvents(payload: RequestPayload) {
    const { page } = payload.query;
    return this.eventService.getAllEvents(page || 1);
  }

  @Route(["params"])
  async deleteEvent(payload: RequestPayload) {
    const { id } = payload.params;
    const data = await this.eventService.deleteEvent(+id);
    return { message: `Deleted events: ${data.affected}` };
  }

  @Route(["body", "file"])
  async createEvent(payload: RequestPayload) {
    const { ownerId, body, categoryId }: ICreateEvent = payload.body;
    const newEvent = await this.eventService.createEvent({
      ownerId,
      body,
      categoryId,
      image: payload.file,
    });
    return newEvent;
  }

  @Route(["body", "user"])
  async modifyEvent(payload: RequestPayload) {
    const { id, body }: IModifyEvent = payload.body;
    const { id: userIdFromToken } = payload.user;
    const modifiedEvent = await this.eventService.modifyEvent(
      id,
      body,
      userIdFromToken
    );
    return modifiedEvent;
  }

  @Route(["params"])
  async getEventSubs(payload: RequestPayload) {
    const { id } = payload.params;
    const eventSubs = await this.eventService.getEventSubscribers(+id);
    return eventSubs;
  }

  @Route(["params"])
  async getSinglEvent(payload: RequestPayload) {
    const { id } = payload.params;
    const event = await this.eventService.getSingleEvent(+id);
    return event;
  }

  @Route(["body"])
  async searchEvents(payload: RequestPayload) {
    const { query } = payload.body;
    const results = await this.eventService.searchEvents(query);
    return results;
  }
}
export default EventController;
