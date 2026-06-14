const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
  it("should register user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "Test@1234"
      });

    expect(res.statusCode).toBe(201);
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@example.com",
        password: "Test@1234"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("accessToken");
  });
});
