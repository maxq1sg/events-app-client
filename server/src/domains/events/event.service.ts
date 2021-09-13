import { HttpStatusCode } from "./../../errors/HttpStatusCodes";
import User from "../../domains/users/user.model";
import { getConnection, ILike } from "typeorm";
import { ICreateEvent, IEvent } from "./dtos/create.event";
import Event from "./event.model";
import CustomError from "../../errors/errorTypes/CustomError";
import { InjectRepository } from "typeorm-typedi-extensions";
import EventRepository from "./event.repository";
import UserRepository from "../users/user.repository";
import { Service } from "typedi";
import CategoryRepository from "../category/category.repository";
import Category from "../category/category.model";
import FileService from "../file/file.service";

@Service()
class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: EventRepository,
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Category) private categoryRepository: CategoryRepository,
    private readonly fileService: FileService
  ) {}

  getAllEvents(page: number) {
    const LIMIT = 5;
    const SKIP = LIMIT * (page - 1);
    return this.eventRepository.find({ take: LIMIT, skip: SKIP });
  }
  deleteEvent(id: number) {
    return this.eventRepository.delete(id);
  }
  async createEvent(createEventBody: ICreateEvent) {
    const { ownerId, body, categoryId, image } = createEventBody;
    const owner = await this.userRepository.findOne(ownerId);
    if (!owner) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, "No such user");
    }

    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, "No such category");
    }

    const preview = await this.fileService.addNewFileToStorage(image);
    const newEvent = this.eventRepository.create({
      ...body,
      category,
      owner,
      preview,
    });
    return newEvent.save();
  }

  async modifyEvent(id: number, body: IEvent, userFromToken: number) {
    const newEvent = await this.eventRepository.findOne(id, {
      relations: ["owner"],
    });
    if (!newEvent) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, "Событие не найдено!");
    }
    const owner_id = newEvent.owner?.id;
    if (owner_id !== userFromToken) {
      throw new CustomError(
        HttpStatusCode.FORBIDDEN,
        "Нет прав на изменение этого события!"
      );
    }
    newEvent.description = body.description || newEvent.description;
    newEvent.name = body.name || newEvent.name;
    newEvent.date = body.date || newEvent.date;
    return newEvent.save();
  }
  async getEventSubscribers(id: number) {
    const event = await this.eventRepository.findOne(id, {
      relations: ["users"],
      select: ["id"],
    });
    if (!event) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, "Событие не найдено!");
    }
    return event.users.map((evt) => {
      evt.password = null;
      return evt;
    });
  }
  getSingleEvent(id: number) {
    return this.eventRepository.findOne(id, { relations: ["users", "owner"] });
  }
  searchEvents(searchQuery: string) {
    return this.eventRepository.find({
      where: { name: ILike(`%${searchQuery}%`) },
    });
  }

  static clearEvents() {
    return getConnection().createQueryBuilder().delete().from(Event).execute();
  }

  static async seedEvents(creatorIds: number[]) {
    const firstOwner = await User.findOne(creatorIds[0]);
    const secondOwner = await User.findOne(creatorIds[1]);
    const { identifiers } = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Event)
      .values([
        { name: "first", description: "first event ever", owner: firstOwner },
        {
          name: "second",
          description: "second event ever",
          owner: secondOwner,
        },
        { name: "third", description: "third event ever", owner: secondOwner },
        { name: "fourth", description: "fourth event ever", owner: firstOwner },
        {
          name: "FourthWithUppercase",
          description: "fourth event ever",
          owner: firstOwner,
        },
      ])
      .returning("id")
      .execute();
    return identifiers.map((idItem) => idItem.id);
  }
}
export default EventService;
