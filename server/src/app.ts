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
  app: Application;
  server: http.Server;

  constructor() {
    dotenv.config();

    this.app = express();
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api/events", eventRouter);
    this.app.use("/api/users", usersRouter);
    this.app.use("/api/sub", subRouter);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/roles", rolesRouter);
    this.app.use("/api/perm", permissionsRouter);
    this.app.get("/maxim", (req: Request, res: Response) => {
      res.json({ mes: "ya_eblan" });
    });
    this.app.use(errorHandler);
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
    this.server = this.app.listen(PORT, () => {
      console.log(chalk.green(`server is running on port ${PORT}`));
    });
    return this.app;
  }
  async startApplication() {
    await this.setupDb();
    this.startServer();
  }

  stopServer() {
    this.server?.close();
  }
}
