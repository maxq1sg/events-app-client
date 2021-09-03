import {
  getConnection,
  getManager,
  getRepository,
  SelectQueryBuilder,
} from "typeorm";
import { RegisterUser } from "./dtos/user-dto";
import User from "./user.model";
import Event from "./user.model";
import EventRepository from "./user.repository";
import * as bcrypt from "bcrypt";

class UserService {
  // private eventRepository: any;
  // constructor() {
  //   this.eventRepository = getConnection()
  // }
  async findSingleUser(id: number) {
    return User.findOne(id);
  }
  async deleteUser(id: number) {
    return User.delete(id);
  }
  async findAllUsers() {
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
}
export default UserService;
