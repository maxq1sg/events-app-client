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

  //-------------------------------------------------------------------auth

  test("user can login with correct data", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "admin@gmail.com", password: "12345" });
    expect(response.statusCode).toBe(200);
  });

  test("user can't login with incorrect data", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "admin@gmail.com", password: "123456" });
    expect(response.statusCode).toBe(401);
  });

  test("user can register with correct data", async () => {
    const response = await request.post("/api/auth/register").send({
      first_name: "ivan",
      last_name: "ivanov",
      password: "12345",
      email: "max@gmail.com",
      role: "EDITOR",
    });
    expect(response.statusCode).toBe(200);
  });

  test("user can't register with email already in use", async () => {
    const response = await request.post("/api/auth/register").send({
      first_name: "ivan",
      last_name: "ivanov",
      password: "12345",
      email: "admin@gmail.com",
      role: "EDITOR",
    });
    expect(response.statusCode).toBe(401);
  });

  //-------------------------------------------------------------events

  test("unathorized user can't create events", async () => {
    const response = await request.post("/api/events").send({
      owner_id: user_ids[0],
      body: { name: "mainEvent", description: "very interesting" },
    });
    expect(response.statusCode).toBe(401);
  });

  test('users with "CREATE_EVENT" permission can create events', async () => {
    const { token } = await authorizeAsRole(request, ERole.ADMIN);
    const response = await request
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        owner_id: user_ids[2],
        body: { name: "mainEvent", description: "very interesting" },
      });
    expect(response.statusCode).toBe(200);
  });

  test('users with no "CREATE_EVENT" permission can\'t create events', async () => {
    const { token } = await authorizeAsRole(request, ERole.USER);
    const response = await request
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        owner_id: user_ids[2],
        body: { name: "mainEvent", description: "very interesting" },
      });
    expect(response.statusCode).toBe(403);
  });

  //---------------------------------------------------------------------------subscription

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
  //----------------------------------------------------------------------------users
  test('Users without permission "ADMIN" can\'t show users list', async () => {
    const { token, user } = await authorizeAsRole(request, ERole.USER);
    const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
  });

  test('Users with permission "ADMIN" can show users list', async () => {
    const { token, user } = await authorizeAsRole(request, ERole.ADMIN);
    const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test("authorized users can see their event subscriptions", async () => {
    const { token, user } = await authorizeAsRole(request, ERole.ADMIN);
    await request
      .post("/api/sub/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: user_ids[0],
        eventId: event_ids[0],
      });

    const response = await request
      .get(`/api/users/${user_ids[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ id: user_ids[0] });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test("users can't see event subscriptions of other users", async () => {
    const { token, user } = await authorizeAsRole(request, ERole.EDITOR);

    const response = await request
      .get(`/api/users/${user_ids[0]}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ id: user_ids[0] });
    expect(response.statusCode).toBe(403);
  });

  //------------------------------------------------------------------
  afterAll(async () => {
    await EventService.clearEvents();
    await UserService.clearUsers();
    await connection.close();
    await app.close();
  });
});
