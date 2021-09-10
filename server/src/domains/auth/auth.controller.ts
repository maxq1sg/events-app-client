import Role from "../roles/roles.model";
import { Request, Response, Router } from "express";
import UserService from "../users/user.service";
import AuthService from "./auth.service";
import { RegisterUser } from "./dtos/aut.dto";
import User from "../../domains/users/user.model";
import CustomError from "./../../errors/errorTypes/CustomError";
import { HttpStatusCode } from "./../../errors/HttpStatusCodes";
import { LoginUser } from "./dtos/aut.dto";
import { validationResult } from "express-validator";

class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  loginUser = async (req: Request, res: Response) => {
    const { email, password }: LoginUser = req.body;
    const userInDb = await this.authService.loginUser({ email, password });
    const token = this.authService.generateToken({
      email: userInDb.email,
      id: userInDb.id,
      role: userInDb.role,
    });
    userInDb.password = null;
    return { user: userInDb, token };
  };
  registerUser = async (req: Request, res: Response) => {
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
  };
}
export default new AuthController();
