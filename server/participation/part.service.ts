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
// import { RegisterUser } from "./users/dtos/user-dto";

class PartService {
  // private eventRepository: any;
  // constructor() {
  //   this.eventRepository = getConnection()
  // }
  async createParticipation(body: AddParticipation) {
    const { userId, eventId } = body;
    const user = await User.findOne(userId);
    const event = await Event.findOne(eventId);
    if (!user || !event) {
      throw new Error("Error while creating participation!");
    }
    if (user.events) {
      user.events.push(event);
    } else {
      user.events = [event];
    }
    // event.users.push(user);
    console.log(user);
    // await event.save();
    await user.save();
    return true;
  }
}
export default PartService;
