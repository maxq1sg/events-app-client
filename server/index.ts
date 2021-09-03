import eventController from "./events/event-controller";
import express, { Application, Request, Response } from "express";
import { createConnection } from "typeorm";
import connectPostgres from "./connectPostgres";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/events");
// app.use("/users");

const PORT = 4000;
app.listen(PORT, async () => {
  try {
    await connectPostgres();
    app.use("/api/events", eventController.router);

    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log("error ocured", error.message);
  }
});
