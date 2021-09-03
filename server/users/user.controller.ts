import { Request, Response, Router } from "express";
import EventService from "./user.service";
import "reflect-metadata";
import UserService from "./user.service";
import { RegisterUser } from "./dtos/user-dto";
import protect from "../middleware/AuthGuard";
import RoleGuard from "../middleware/RoleGuard";
// import { Router } from "express";

// const router = Router();

// router.post("/")

// export default router

class UserController {
  public router: Router;
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.router.post("/", this.createUser);
    this.router.get("/:id", this.getSingleUserById);
    this.router.delete("/:id", this.deleteUserById);
    this.router.get("/", protect, RoleGuard("ADMIN"), this.getAllUsers);
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
  getSingleUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userService.findSingleUser(+id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const data = await this.userService.findAllUsers();
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
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
}
export default new UserController();
