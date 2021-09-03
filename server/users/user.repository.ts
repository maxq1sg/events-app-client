import Event from "./user.model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Event)
export default class EventRepository extends Repository<Event> {}
