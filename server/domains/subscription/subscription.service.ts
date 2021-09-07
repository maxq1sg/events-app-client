import { SubscriptionDto } from "./dtos/subscription.dto";
import User from "../users/user.model";
import Event from "../events/event.model";

class SubService {
  async createSubscription(body: SubscriptionDto) {
    const { userId, eventId } = body;
    const user = await User.findOne(userId, { relations: ["events"] });
    const event = await Event.findOne(eventId);
    console.log(user);
    if (!user || !event) {
      throw new Error("Участие в мероприятии не создано!");
    }
    user?.events.push(event);
    await user.save();
    return { success: true, event_name: event.name }
  }
  async cancelSubscription(body: SubscriptionDto) {
    const { userId, eventId } = body;
    const user = await User.findOne(userId, { relations: ["events"] });
    const event = await Event.findOne(eventId);

    if (!user || !event) {
      throw new Error("Отмена участия закончилась ошибкой");
    }
    user.events = user.events.filter((event) => event.id !== eventId);

    await user.save();
    return { success: true, event_name: event.name };
  }
}
export default SubService;
