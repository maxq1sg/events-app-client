import Event from "./events/event.model";
import { createConnection } from "typeorm";

export default async function connectPostgres() {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "6101665",
      database: "events-db",
      // name: "events-app",
      entities: [Event],
      synchronize: true,
    });
    console.log("db connected!");
  } catch (error) {
    console.log("error: ", error.message);
  }
}
