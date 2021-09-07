import chalk from "chalk";
import authController from "./domains/auth/auth.controller";
import eventController from "./domains/events/event-controller";
import { Application } from "express";
import partController from "./domains/subscription/subscription.controller";
import express from "express";
import { createConnection } from "typeorm";
import User from "./domains/users/user.model";
import Event from "./domains/events/event.model";
import dotenv from "dotenv";
import Role from "./domains/roles/roles.model";
import Permission from "./domains/permisssions/permissions.model";

import "reflect-metadata";
import usersRouter from "./domains/users/user.router";
import rolesRouter from "./domains/roles/roles.router";
import permissionsRouter from "./domains/permisssions/permissions.router";
import authRouter from "./domains/auth/auth.router";
import subRouter from "./domains/subscription/subscription.router";
import eventRouter from "./domains/events/event.router";

export default class App {
  app: Application;
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
  }

  async setupDbAndServer() {
    const conn = await createConnection({
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
      chalk.green(`db connected: ${conn.name}/${conn.options.database} `)
    );
    await this.startServer();
  }

  startServer() {
    const PORT = process.env.APP_PORT;
    this.app.listen(PORT, () => {
      console.log(chalk.green(`server is running on port ${PORT}`));
    });
  }
}
