import { ERole } from "./../../domains/roles/dto/index";
import supertest from "supertest";

export default async function authorizeAsRole(
  request: supertest.SuperTest<supertest.Test>,
  role: ERole
): Promise<string> {
  const loginResponse = await request
    .post("/api/auth/login")
    .send({ email: "1631113630129@gmail.com", password: "12345" });
  return loginResponse.body.token;
}
