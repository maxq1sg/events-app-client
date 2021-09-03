import { Request, Response, Router } from "express";
import "reflect-metadata";
import AuthService from "./aut.service";
import { RegisterUser } from "./dtos/aut.dto";
// import { Router } from "express";

// const router = Router();

// router.post("/")

// export default router

class UserController {
  public router: Router;
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService()
    this.router = Router();
    this.router.get("/", this.registerUser);
  }
  registerUser = async (req: Request, res: Response) => {
    try {
     
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new UserController();
