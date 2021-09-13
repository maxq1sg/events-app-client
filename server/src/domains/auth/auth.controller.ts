import { Request, Response, Router } from "express";
import AuthService from "./auth.service";
import { RegisterUser } from "./dtos/aut.dto";
import { LoginUser } from "./dtos/aut.dto";
import Route from "../../middleware/RouteDecorator";
import { Service } from "typedi";
import { loginSchema, registrationSchema } from "./validation";
import { checkSchema } from "express-validator";

@Service()
class AuthController {
  public router:Router
  constructor(private readonly authService: AuthService) {
    this.router = Router()
    this.router.post(
      "/register",
      checkSchema(registrationSchema),
      this.registerUser
    );
    this.router.post("/login", checkSchema(loginSchema), this.loginUser);
  }

  @Route()
  async loginUser(req: Request, res: Response) {
    const { email, password }: LoginUser = req.body;
    const { password: _, ...userInDb } = await this.authService.loginUser({
      email,
      password,
    });
    const token = this.authService.generateToken({
      email: userInDb.email,
      id: userInDb.id,
      role: userInDb.role,
    });
    return { user: userInDb, token };
  }

  @Route()
  async registerUser(req: Request, res: Response) {
    const {
      first_name,
      last_name,
      add_data,
      password,
      email,
      role,
    }: RegisterUser = req.body;
    const newUser = await this.authService.registerUser({
      first_name,
      last_name,
      add_data,
      password,
      email,
      role,
    });
    const token = this.authService.generateToken({
      email: newUser.email,
      id: newUser.id,
      role: newUser?.role,
    });
    newUser.password = null;
    return { user: newUser, token };
  }
}
export default AuthController;
