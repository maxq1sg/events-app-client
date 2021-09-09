import App from "../app";
import supertest from "supertest";
import setupTestDB from "./utils/connectToTestDb";
import { Connection } from "typeorm";
import UserService from "../domains/users/user.service";
import EventService from "../domains/events/event.service";
import authorizeAsRole from "./utils/authorizeAsRole";
import { ERole } from "../domains/roles/dto";
import User from "../domains/users/user.model";

describe("test auth route", function () {
  const app = new App().startServer();
  const request = supertest(app);

  let connection: Connection;
  let user_ids: number[];
  let event_ids: number[];

  beforeAll(async () => {
    connection = await setupTestDB();
    user_ids = await UserService.seedUsers();
    event_ids = await EventService.seedEvents(user_ids[0], user_ids[1]);
  });

  test('authorized users with "SUBSCRIPTION" permission can make subscription', async () => {
    const { token, user } = await authorizeAsRole(request, ERole.USER);
    const response = await request
      .post("/api/sub/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: user_ids[0],
        eventId: event_ids[0],
      });
    const userFromDb = await User.findOne(user_ids[0], {
      relations: ["events"],
    });
    expect(response.statusCode).toBe(200);
    expect(userFromDb.events.length).toBe(1);
  });

  test('authorized users with "SUBSCRIPTION" permission can cancel subscription', async () => {
    const { token, user } = await authorizeAsRole(request, ERole.USER);
    const response = await request
      .post("/api/sub/cancel")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: user_ids[0],
        eventId: event_ids[0],
      });
    const userFromDb = await User.findOne(user_ids[0], {
      relations: ["events"],
    });

    expect(response.statusCode).toBe(200);
    expect(userFromDb.events.length).toBe(0);
  });

  afterAll(async () => {
    await EventService.clearEvents();
    await UserService.clearUsers();
    await connection.close();
    await app.close();
  });
});
