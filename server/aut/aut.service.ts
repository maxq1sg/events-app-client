import jwt from "jsonwebtoken";
import { LoginUser, TokenPayload } from "./dtos/aut.dto";
import { getConnection, getCustomRepository } from "typeorm";
import { RegisterUser } from "./../users/dtos/user-dto";
import TestRepository from "./aut.repository";
import Test from "./model";
import User from "../users/user.model";
import * as bcrypt from "bcrypt";

class AuthService {
  private authRepository: TestRepository;
  constructor() {
    // this.authRepository = getConnection().getCustomRepository(Test);
  }
  registerUser(body: RegisterUser) {}
  async loginUser(body: LoginUser) {
    const { email, password } = body;
    const userInDb = await User.findOne({ where: { email } });
    if (!userInDb) {
      throw new Error("ошибка при входе в систему");
    }
    const isValid = bcrypt.compare(password, userInDb?.password);
    if (isValid) {
      return userInDb;
    } else {
      throw new Error("ошибка при входе в систему");
    }
  }
  generateToken(payload: TokenPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
  }
}

export default AuthService;
