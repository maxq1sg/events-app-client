import { getRepository } from "typeorm";
import { RegisterUser } from "./../users/dtos/user-dto";
import TestRepository from "./aut.repository";
import Test from "./model";

class AuthService {
  private authRepository: TestRepository;
  constructor() {
    const authRepository = getRepository(Test);
  }
  registerUser() {
    this.authRepository.find();
  }
}

export default AuthService;
