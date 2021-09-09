import chalk from "chalk";
import { Connection, createConnection } from "typeorm";
import Event from "../../domains/events/event.model";
import Permission from "../../domains/permisssions/permissions.model";
import Role from "../../domains/roles/roles.model";
import User from "../../domains/users/user.model";

export default function setupTestDB(): Promise<Connection> {
  return createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    entities: [Event, User, Role, Permission],
    synchronize: true,
  });
}
