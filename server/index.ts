import eventController from "./events/event-controller";
import usersController from "./users/user.controller";
import partController from "./participation/part.controller";
import authController from "./aut/aut.controller";
import express, { Application } from "express";
import connectDB from "./connectDb";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/events", eventController.router);
app.use("/api/users", usersController.router);
app.use("/api/part", partController.router);
app.use("/api/auth", authController.router);

const PORT = process.env.APP_PORT;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(chalk.green(`server is running on port ${PORT}`));
  } catch (error) {
    console.log(chalk.red(`error ocured: ${error.message}`));
  }
});
