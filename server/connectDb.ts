import Event from "./events/event.model";
import { createConnection } from "typeorm";
import chalk from "chalk";
import User from "./users/user.model";

export default async function connectDB() {
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Event, User],
    synchronize: true,
  });
  console.log(chalk.green("db connected"));
}
