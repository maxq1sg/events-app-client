import { getManager, getRepository } from "typeorm";
import { ICreateEvent } from "./dtos/create.event";
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

  async modifyEvent(id: number, body: ICreateEvent) {
    const newEvent = await Event.findOne(id);
    if (!newEvent) {
      throw new Error("Ошибка при изменении ивента");
    }
    newEvent.description = body.description || newEvent.description;
    newEvent.name = body.name || newEvent.name;
    newEvent.date = body.date || newEvent.date;
    return newEvent.save();
  }
  async getEventSubscribers(id: number) {
    const event = await Event.findOne(id, { relations: ["users"] });
    return event.users.map((item) => {
      item.password = null;
      return item;
    });
  }
}
export default EventService;
