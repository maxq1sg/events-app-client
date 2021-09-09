import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import { RegisterUser } from "./dtos/user-dto";

class UserController {
  private userService: UserService;
  constructor() {
    this.getAllUsers = this.getAllUsers.bind(this);
    this.userService = new UserService();
  }

  deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.userService.deleteUser(+id);
    res
      .status(200)
      .json({ message: `Удалено пользователей: ${data.affected}` });
  };
  //fix
  getEventsOfSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const events = await this.userService.getEventsOfSingleUser(+id);
    res.status(200).json(events);
  };

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const data = await this.userService.findAllUsers();
    res.status(200).json(data);
  }
  createUser = async (req: Request, res: Response) => {
    const {
      first_name,
      last_name,
      add_data,
      password,
      email,
      role,
    }: RegisterUser = req.body;
    const newUser = await this.userService.createUser({
      first_name,
      last_name,
      add_data,
      password,
      email,
      role,
    });
    res.json(newUser);
  };
  seedUsers = async (req: Request, res: Response) => {
    const identifiers = await UserService.seedUsers();
    res.json(identifiers);
  };
}
export default new UserController();
