import chalk from "chalk";
import express, { Application, Request, Response } from "express";
import { createConnection } from "typeorm";
import User from "./domains/users/user.model";
import Event from "./domains/events/event.model";
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

export default class App {
  private _app: Application;
  private _server: http.Server;

  constructor() {
    dotenv.config();

    this._app = express();
    this._app.use(express.json());

    this._app.use(express.urlencoded({ extended: true }));
    this._app.use("/api/events", eventRouter);
    this._app.use("/api/users", usersRouter);
    this._app.use("/api/sub", subRouter);
    this._app.use("/api/auth", authRouter);
    this._app.use("/api/roles", rolesRouter);
    this._app.use("/api/perm", permissionsRouter);
    this._app.get("/maxim", (req: Request, res: Response) => {
      res.json({ mes: "ya_eblan" });
    });
    this._app.use(errorHandler);
  }
  async setupDb() {
    const connection = await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Event, User, Role, Permission],
      synchronize: true,
    });
    console.log(
      chalk.green(
        `db connected: ${connection.name}/${connection.options.database} `
      )
    );
    return connection;
  }
  startServer() {
    const PORT = process.env.APP_PORT || 4000;
    this._server = this._app.listen(PORT, () => {
      console.log(chalk.green(`server is running on port ${PORT}`));
    });
    return this._app;
  }
  async startApplication() {
    await this.setupDb();
    return this.startServer();
  }

  get app(){
    return this._app
  }
}
