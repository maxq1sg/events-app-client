import { getManager, getRepository } from "typeorm";
import ICreateEvent from "./dtos/create.event";
import Event from "./event.model";
import EventRepository from "./event.repository";

class EventService {
  private eventRepository: EventRepository;
  constructor() {}
  async createEvent(body: ICreateEvent) {
    this.eventRepository = getRepository(Event);
    const newEvent = await this.eventRepository.save(body);
    return newEvent;
  }
}
export default EventService;
