import App from "../app";
import supertest from "supertest";

const request = supertest(new App);

it("Testing to see if Jest works", async (done) => {
  const response = await request.get("/api/users");
  expect(response.status).toBe(401);
  done();


});
