import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import App from "./app";
import setupDB, { EMode } from "./setupDb";
import { Connection, getConnection } from "typeorm";
import User from "./domains/users/user.model";
import { singleton } from "tsyringe";

// class MySevice {
//   private readonly _connection: Connection;
//   constructor() {
//     this._connection = getConnection();
//   }
//   getUsers() {
//     return { ma: "d" };
//   }
// }

// @singleton()
// class MyController {
//   public readonly router: Router;
//   private userService: MySevice;
//   constructor() {
//     this.getusers = this.getusers.bind(this);
//     this.userService = new MySevice();
//     this.router = Router();
//     this.router.get("/", this.getusers);
//   }
//   async getusers(req: Request, res: Response) {
//     const data = await this.userService.getUsers();
//     res.json(data);
//   }
// }

const server = setupDB(EMode.DEV).then((connection) => {
  new App().startApplication();
  // const app = express();
  // const Myc = new MyController()

  // app.use("/", Myc.router);
  // app.use(express.urlencoded({ extended: true }));

  // app.listen(4000, () => {
  //   console.log("server is running");
  // });
});

export default server;
