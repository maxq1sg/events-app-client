import { HttpStatusCode } from "./../../errors/HttpStatusCodes";
import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import { RegisterUser } from "./dtos/user-dto";
import CustomRequest from "../../types/CustomRequest";
import CustomError from "../../errors/errorTypes/CustomError";
import Route from "../../middleware/RouteDecorator";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  @Route()
  async deleteUserById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.userService.deleteUser(+id);
    res
      .status(200)
      .json({ message: `Удалено пользователей: ${data.affected}` });
  };
  //fix
  @Route()
  async getEventsOfSingleUser(req: CustomRequest, res: Response) {
    const { id: idFromClient } = req.params;
    const { id: idFromToken } = req.user;

    if (+idFromClient !== idFromToken) {
      throw new CustomError(
        HttpStatusCode.FORBIDDEN,
        "У вас нет доступа для просмотра!"
      );
    }
    const events = await this.userService.getEventsOfSingleUser(+idFromToken);
    res.status(200).json(events);
  };

  @Route()
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const data = await this.userService.findAllUsers();
    res.status(200).json(data);
  }
  
  @Route()
  async createUser(req: Request, res: Response) {
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
  
  @Route()
  async seedUsers(req: Request, res: Response) {
    const identifiers = await UserService.seedUsers();
    res.json(identifiers);
  };
}
export default new UserController();
