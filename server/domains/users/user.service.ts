import { getConnection, getManager, getRepository } from "typeorm";
import { RegisterUser } from "./dtos/user-dto";
import User from "./user.model";
import * as bcrypt from "bcrypt";
import Role from "../roles/roles.model";

class UserService {
  // findSingleUser(id: number) {
  //   return User.findOne(id, { relations: ["role"] });
  // }

  deleteUser(id: number) {
    return User.delete(id);
  }

  async getEventsOfSingleUser(id: number) {
    const user = await User.findOne(id, { relations: ["events"] });
    return user.events;
  }

  findAllUsers() {
    return User.find({
      select: ["add_data", "first_name", "last_name", "email"],
    });
  }

  async createUser(body: RegisterUser) {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);
    body.password = hashedPassword;
    const newUser = User.create(body);
    await newUser.save();
    return newUser;
  }

  async seedUsers() {
    const first = await Role.findOne({ where: { name: "EDITOR" } });
    const second = await Role.findOne({ where: { name: "ADMIN" } });

    const password = await bcrypt.hash("12345", 10);
    if (first && second) {
      console.log("success");
    }
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
