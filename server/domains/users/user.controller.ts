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
    try {
      const { id } = req.params;
      const success = await this.userService.deleteUser(+id);
      res.status(200).json({ message: Boolean(success.affected) });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  getEventsOfSingleUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getEventsOfSingleUser(+id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
      const data = await this.userService.findAllUsers();
      res.status(200).json(data);
  }
  createUser = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  seedUsers = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.seedUsers();
      res.json({ message: "success" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new UserController();
