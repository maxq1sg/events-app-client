import { HttpStatusCode } from './../../errors/HttpStatusCodes';
import { getConnection } from "typeorm";
import { RegisterUser } from "./dtos/user-dto";
import User from "./user.model";
import * as bcrypt from "bcrypt";
import Role from "../roles/roles.model";
import CustomError from '../../errors/errorTypes/CustomError';


class UserService {
  async deleteUser(id: number) {
    const data = await User.delete(id);
    if(!data?.affected){
      throw new CustomError(HttpStatusCode.NOT_FOUND,"Ошибка при удалении пользователя");
      
    }
    return data
  }

  async getEventsOfSingleUser(id: number) {
    const user = await User.findOne(id, { relations: ["events"] });
    if(!user){
      throw new CustomError(HttpStatusCode.NOT_FOUND,"Пользователь не найден")
    }
    return user.events;
  }

  findAllUsers() {
    return User.find({
      select: ["add_data", "first_name", "last_name", "email"],
    });
  }

  async createUser(body: RegisterUser) {
    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT_ROUNDS);
    body.password = hashedPassword;
    const newUser = User.create(body);
    await newUser.save();
    return newUser;
  }
  async seedUsers() {
    const first = await Role.findOne({ where: { name: "EDITOR" } });
    const second = await Role.findOne({ where: { name: "ADMIN" } });
    const password = await bcrypt.hash("12345", 10);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          first_name: "EDITTTTOR",
          email: `${Date.now()}@gmail.com`,
          password,
          last_name: "bernadsk",
          add_data: {
            is_married: false,
            address: "grodno",
          },
          role: first,
        },
        {
          first_name: "ODMEEN",
          email: `${Date.now() + 10}@gmail.com`,
          password,
          last_name: "ber",
          add_data: {
            is_married: false,
            address: "grodno",
          },
          role: second,
        },
      ])
      .execute();
  }
}
export default UserService;
