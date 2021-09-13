import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import App from "./app";
import setupDB from "./setupDb";
import { Connection, getConnection } from "typeorm";
import User from "./domains/users/user.model";

dotenv.config();

class MyController {
  private readonly _connection: Connection;
  constructor() {
    this._connection = getConnection();
    this.getusers = this.getusers.bind(this);
  }
  async getusers(req: Request, res: Response) {
    console.log(this._connection);
    const data = await User.find();
    res.json(data);
  }
}

const router = Router();

router.get("/", new MyController().getusers);

const server = setupDB().then((connection) => {
    new App().startApplication();
//   const app = express();

//   app.use("/", router);

//   app.listen(4000, () => {
//     console.log("server is running");
//   });
});

export default server;
