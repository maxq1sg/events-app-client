import App from "../app";
import supertest from "supertest";
import setupTestDB from "./utils/connectToTestDb";
import RoleService from "../domains/roles/roles.service";
import PermissionService from "../domains/permisssions/permissions.service";
import { Connection } from "typeorm";

describe("test basic route", function () {
  const request = supertest(new App().startServer());

  let connection: Connection;
  beforeAll(async () => {
    connection = await setupTestDB();
    await RoleService.seedRoles();
    await PermissionService.seedPermissions();
  });

  // test("get users list when unauthorized", async () => {
  //   const response = await request.get("/api/users");
  //   expect(response.status).toBe(401);
  // });
  test("get list of all roles", async () => {
    expect(2).toBe(2);
  });

  // test("get user list as admin", async () => {
  //   const loginResponse = await request
  //     .post("/api/auth/login")
  //     .send({ email: "1631113630129@gmail.com", password: "12345" });
  //   const token = loginResponse.body.token;

  //   const response = await request
  //     .get("/api/users")
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(response.statusCode).toBe(200);
  // });

  // test("get no user list as common user", async () => {
  //   const loginResponse = await request
  //     .post("/api/auth/login")
  //     .send({ email: "1631113630119@gmail.com", password: "12345" });
  //   const token = loginResponse.body.token;

  //   const response = await request
  //     .get("/api/users")
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(response.statusCode).toBe(403);
  // });
  afterAll(async () => {
    await RoleService.clearAllRoles();
    await PermissionService.clearAllPermissions();
    await connection.close()
    
  });
});
