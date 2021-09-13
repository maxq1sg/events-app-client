import { Router } from "express";
import AuthService from "./auth.service";
import { RegisterUser } from "./dtos/aut.dto";
import { LoginUser } from "./dtos/aut.dto";
import Route from "../../middleware/RouteDecorator";
import { Service } from "typedi";
import { RequestPayload } from "../../middleware/types/MetaType";
import initAuthRouter from "./auth.router";

@Service()
class AuthController {
  public router: Router;
  constructor(private readonly authService: AuthService) {
    this.router = Router();
    initAuthRouter.call(this, this.router);
  }

  @Route(["body"])
  async loginUser(payload: RequestPayload) {
    const { email, password }: LoginUser = payload.body;
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

  @Route(["body"])
  async registerUser(payload: RequestPayload) {
    const {
      first_name,
      last_name,
      add_data,
      password,
      email,
      role,
    }: RegisterUser = payload.body;
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
