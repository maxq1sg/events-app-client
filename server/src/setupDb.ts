import chalk from "chalk";
import Container from "typedi";
import { createConnection, useContainer } from "typeorm";
import Event from "./domains/events/event.model";
import Permission from "./domains/permisssions/permissions.model";
import Role from "./domains/roles/roles.model";
import User from "./domains/users/user.model";

export default async function setupDB() {
  useContainer(Container);

  const connection = await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Event, User, Role, Permission],
    synchronize: false,
  });
  console.log(
    chalk.green(
      `db connected: ${connection.name}/${connection.options.database} `
    )
  );
  return connection;
}
