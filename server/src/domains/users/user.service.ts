import { HttpStatusCode } from "./../../errors/HttpStatusCodes";
import {
  Connection,
  EntityManager,
  getConnection,
  getManager,
  getRepository,
  Repository,
} from "typeorm";
import { ChangeUsersRole, CreateUser } from "./dtos/user-dto";
import User from "./user.model";
import * as bcrypt from "bcrypt";
import Role from "../roles/roles.model";
import CustomError from "../../errors/errorTypes/CustomError";
import UserRepository from "./user.repository";
import { inject, injectable } from "tsyringe";
import { InjectRepository } from "typeorm-typedi-extensions";
import Container, { Service } from "typedi";

@Service()
class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async changeUsersRole({ role_id, user_id }: ChangeUsersRole) {
    const role = await Role.findOne(role_id);
    const user = await User.findOne(user_id);
    if (!role || !user) {
      throw new CustomError(
        HttpStatusCode.BAD_REQUEST,
        "Error while changing role for user"
      );
    }

    user.role = role;
    await user.save();

    return user;
  }
  async deleteUser(id: number) {
    const data = await this.userRepository.delete(id);
    if (!data?.affected) {
      throw new CustomError(
        HttpStatusCode.NOT_FOUND,
        "Ошибка при удалении пользователя"
      );
    }
    return data;
  }

  async getEventsOfSingleUser(id: number) {
    const user = await User.findOne(id, { relations: ["events"] });
    if (!user) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, "Пользователь не найден");
    }
    return user.events;
  }

  findAllUsers() {
    return User.find({
      select: ["add_data", "first_name", "last_name", "email"],
    });
  }

  async createUser(body: CreateUser) {
    const hashedPassword = await bcrypt.hash(
      body.password,
      +process.env.SALT_ROUNDS
    );
    body.password = hashedPassword;
    const newUser = User.create(body);
    await newUser.save();
    return newUser;
  }
  static clearUsers() {
    return getConnection().createQueryBuilder().delete().from(User).execute();
  }

  static async seedUsers() {
    const editor = await Role.findOne({ where: { name: "EDITOR" } });
    const admin = await Role.findOne({ where: { name: "ADMIN" } });
    const user = await Role.findOne({ where: { name: "USER" } });
    const password = await bcrypt.hash("12345", 10);
    const users = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          first_name: "ADM",
          email: `admin@gmail.com`,
          password,
          last_name: "bernadsk",
          add_data: {
            is_married: false,
            address: "grodno",
          },
          role: admin,
        },
        {
          first_name: "edit",
          email: `editor@gmail.com`,
          password,
          last_name: "ber",
          add_data: {
            is_married: false,
            address: "grodno",
          },
          role: editor,
        },
        {
          first_name: "user",
          email: `user@gmail.com`,
          password,
          last_name: "ber",
          add_data: {
            is_married: false,
            address: "grodno",
          },
          role: user,
        },
      ])
      .returning("id")
      .execute();
    return users.identifiers.map((idItem) => idItem.id);
  }
}
export default UserService;
