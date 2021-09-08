import app from "../app";
import supertest from "supertest";

const request = supertest(app);

it("Testing to see if Jest works", async (done) => {
//   const response = await request.get("/api/users");
//   expect(response.status).toBe(401);
//   done();
expect(2).toBe(2)
});
