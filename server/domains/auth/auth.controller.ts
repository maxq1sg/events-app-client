import Role from "../roles/roles.model";
import { Request, Response, Router } from "express";
import UserService from "../users/user.service";
import AuthService from "./auth.service";
import { RegisterUser } from "./dtos/aut.dto";

class AuthController {
  public router: Router;
  private authService: AuthService;
  private userService: UserService;
  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }
  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userInDb = await this.authService.loginUser({ email, password });
      const token = this.authService.generateToken({
        email: userInDb.email,
        id: userInDb.id,
        role: userInDb.role,
      });
      userInDb.password = "низя";
      res.json({ user: userInDb, token });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  registerUser = async (req: Request, res: Response) => {
    try {
      const {
        first_name,
        last_name,
        add_data,
        password,
        email,
        role,
      }: RegisterUser = req.body;
      const usersRole = await Role.findOne({ where: { name: role || "USER" } });
      const newUser = await this.userService.createUser({
        first_name,
        last_name,
        add_data,
        password,
        email,
        role: usersRole,
      });
      const token = this.authService.generateToken({
        email: newUser.email,
        id: newUser.id,
        role: newUser?.role,
      });
      newUser.password = "низя";
      res.json({ user: newUser, token });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new AuthController();
