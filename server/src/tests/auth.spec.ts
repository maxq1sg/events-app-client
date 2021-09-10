// import  server  from './appInit';
// import supertest from "supertest";
// import setupTestDB from "./utils/connectToTestDb";
// import { Connection, getConnection } from "typeorm";
// import UserService from "../domains/users/user.service";
// import EventService from "../domains/events/event.service";



// describe("test auth route", function () {

//   const request = supertest(server);

//   let connection: Connection;
//   let user_ids: number[];
//   let event_ids: number[];

//   beforeAll(async () => {
//     connection = await setupTestDB();
//     user_ids = await UserService.seedUsers();
//     event_ids = await EventService.seedEvents(user_ids[0], user_ids[1]);
//   });

//   test("user can login with correct data", async () => {
//     const response = await request
//       .post("/api/auth/login")
//       .send({ email: "admin@gmail.com", password: "12345" });
//     expect(response.statusCode).toBe(200);
//   });

//   test("user can't login with incorrect data", async () => {
//     const response = await request
//       .post("/api/auth/login")
//       .send({ email: "admin@gmail.com", password: "123456" });
//     expect(response.statusCode).toBe(401);
//   });

//   test("user can register with correct data", async () => {
//     const response = await request.post("/api/auth/register").send({
//       first_name: "ivan",
//       last_name: "ivanov",
//       password: "12345",
//       email: "max@gmail.com",
//       role: "EDITOR",
//     });
//     expect(response.statusCode).toBe(200);
//   });

//   test("user can't register with email already in use", async () => {
//     const response = await request.post("/api/auth/register").send({
//       first_name: "ivan",
//       last_name: "ivanov",
//       password: "12345",
//       email: "admin@gmail.com",
//       role: "EDITOR",
//     });
//     expect(response.statusCode).toBe(401);
//   });

//   afterAll(async () => {
//     await EventService.clearEvents();
//     await UserService.clearUsers();
//     await getConnection().close();
//   });
// });
