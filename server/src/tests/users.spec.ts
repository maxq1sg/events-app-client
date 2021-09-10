// import  server  from './appInit';
// import supertest from "supertest";
// import setupTestDB from "./utils/connectToTestDb";
// import { Connection, getConnection } from "typeorm";
// import UserService from "../domains/users/user.service";
// import EventService from "../domains/events/event.service";
// import authorizeAsRole from "./utils/authorizeAsRole";
// import { ERole } from "../domains/roles/dto";


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

//   test('Users without permission "ADMIN" can\'t show users list', async () => {
//     const { token, user } = await authorizeAsRole(request, ERole.USER);
//     const response = await request
//       .get("/api/users")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(403);
//   });

//   test('Users with permission "ADMIN" can show users list', async () => {
//     const { token, user } = await authorizeAsRole(request, ERole.ADMIN);
//     const response = await request
//       .get("/api/users")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(200);
//   });

//   test("authorized users can see their event subscriptions", async () => {
//     const { token, user } = await authorizeAsRole(request, ERole.ADMIN);
//     await request
//       .post("/api/sub/add")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         userId: user_ids[0],
//         eventId: event_ids[0],
//       });

//     const response = await request
//       .get(`/api/users/${user_ids[0]}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ id: user_ids[0] });
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(1);
//   });

//   test("users can't see event subscriptions of other users", async () => {
//     const { token, user } = await authorizeAsRole(request, ERole.EDITOR);

//     const response = await request
//       .get(`/api/users/${user_ids[0]}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ id: user_ids[0] });
//     expect(response.statusCode).toBe(403);
//   });

//   //------------------------------------------------------------------
//   afterAll(async () => {
//     await EventService.clearEvents();
//     await UserService.clearUsers();
//     await getConnection().close();
//   });
// });
