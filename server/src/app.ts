import chalk from "chalk";
import express, { Application } from "express";

import dotenv from "dotenv";
import Role from "./domains/roles/roles.model";
import Permission from "./domains/permisssions/permissions.model";
import http from "http";
import "reflect-metadata";
import usersRouter from "./domains/users/user.router";
import rolesRouter from "./domains/roles/roles.router";
import permissionsRouter from "./domains/permisssions/permissions.router";
import authRouter from "./domains/auth/auth.router";
import subRouter from "./domains/subscription/subscription.router";
import eventRouter from "./domains/events/event.router";
import errorHandler from "./errors/errorHandler";
import UserController from "./domains/users/user.controller";
import Container from "typedi";
import AuthController from "./domains/auth/auth.controller";

export default class App {
  private _app: Application;
  private _server: http.Server;
  private userController: UserController;
  private authController: AuthController;
  constructor() {
    dotenv.config();

    this.userController = Container.get(UserController);
    // this.authController=Container.get(AuthController)

    this._app = express();
    this._app.use(express.json());

    this._app.use(express.urlencoded({ extended: true }));
    // this._app.use("/api/events", eventRouter);
    this._app.use("/api/users", this.userController.router);
    // this._app.use("/api/sub", subRouter);
    // this._app.use("/api/auth", this.authController.router);
    // this._app.use("/api/roles", rolesRouter);
    // this._app.use("/api/perm", permissionsRouter);
    this._app.use(errorHandler);
  }
  // async setupDb() {
  //   const connection = await createConnection({
  //     type: "postgres",
  //     host: process.env.DB_HOST,
  //     port: +process.env.DB_PORT,
  //     username: process.env.DB_USERNAME,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.DB_NAME,
  //     entities: [Event, User, Role, Permission],
  //     synchronize: true,
  //   });
  //   console.log(
  //     chalk.green(
  //       `db connected: ${connection.name}/${connection.options.database} `
  //     )
  //   );
  //   return connection;
  // }
  startServer() {
    const PORT = process.env.APP_PORT || 4000;
    this._server = this._app.listen(PORT, () => {
      console.log(chalk.green(`server is running on port ${PORT}`));
    });
    return this._app;
  }
  async startApplication() {
    console.log("start app!");
    // await this.setupDb();
    return this.startServer();
  }

  get app() {
    return this._app;
  }
}
