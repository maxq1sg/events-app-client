import { HttpStatusCode } from "./../../errors/HttpStatusCodes";
import User from "../../domains/users/user.model";
import { ILike } from "typeorm";
import { ICreateEvent, IEvent } from "./dtos/create.event";
import Event from "./event.model";
import CustomError from "../../errors/errorTypes/CustomError";

class EventService {
  async createEvent(createEventBody: ICreateEvent) {
    const { owner_id, body } = createEventBody;
    console.log(owner_id);
    const ownerInDb = await User.findOne(owner_id);
    console.log(ownerInDb);
    if (!ownerInDb) {
      throw new CustomError(
        HttpStatusCode.NOT_FOUND,
        "Пользователь не найден!"
      );
    }
    const newEvent = Event.create(body);
    newEvent.owner = ownerInDb;
    await newEvent.save();
    return newEvent;
  }

  async modifyEvent(id: number, body: IEvent) {
    const newEvent = await Event.findOne(id);
    if (!newEvent) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, "Событие не найдено!");
    }
    newEvent.description = body.description || newEvent.description;
    newEvent.name = body.name || newEvent.name;
    newEvent.date = body.date || newEvent.date;
    return newEvent.save();
  }
  async getEventSubscribers(id: number) {
    const event = await Event.findOne(id, { relations: ["users"],select:["id"] });
    if (!event) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, "Событие не найдено!");
    }
    return event.users.map((evt) => {
      evt.password = null;
      return evt;
    });
  }
  getSingleEvent(id: number) {
    return Event.findOne(id, { relations: ["users", "owner"] });
  }
  searchEvents(searchQuery: string) {
    return Event.find({ where: { name: ILike(`%${searchQuery}%`) } });
  }
}
export default EventService;
