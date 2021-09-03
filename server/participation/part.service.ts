import {
  getConnection,
  getManager,
  getRepository,
  SelectQueryBuilder,
} from "typeorm";

import * as bcrypt from "bcrypt";
import { AddParticipation } from "./dtos/part.dto";
import User from "./../users/user.model";
import Event from "./../events/event.model";
import EventRepository from "../events/event.repository";
import UserRepository from "../users/user.repository";
// import { RegisterUser } from "./users/dtos/user-dto";

class PartService {
  private eventRepository: EventRepository;
  private userRepository: UserRepository;
  // constructor() {
    // this.eventRepository = getRepository(Event);
    // this.userRepository = getRepository(User);
  // }
  async createParticipation(body: AddParticipation) {
    this.eventRepository = getRepository(Event);
    this.userRepository = getRepository(User);

    const { userId, eventId } = body;
    // const user = await User.findOne(userId);
    // const event = await Event.findOne(eventId);
    const user = await this.userRepository.findOne(userId);
    const event = await this.eventRepository.findOne(eventId);

    console.log(user);

    if (!user || !event) {
      throw new Error("Error while creating participation!");
    }
    if (user.events) {
      user.events.push(event);
    } else {
      user.events = [event];
    }
    // user.events = [event];
    // event.users = [user];
    // if (event.users) {
    //   event.users.push(user);
    // } else {
    //   event.users = [user];
    // }
    // event.users.push(user);
    // await event.save();
    await user.save();
    return true;
  }
}
export default PartService;
