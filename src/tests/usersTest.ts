import { UserStore, User } from "../models/user";
import supertest from "supertest";
import app from "../server";

beforeAll(async () => {
  const userStore = new UserStore();

  await userStore.create({
    firstName: "user1",
    lastName: "user1",
    password: "123",
  });
});

describe("Testing user handlers", () => {
  const store = new UserStore();
  const request = supertest(app);

  it("test the index func to be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("test /users post call", async () => {
    const user: User = {
      firstName: "Hamza",
      lastName: "Abdulfattah",
      password: "123456",
    };

    const response = await request.post("/users").send(user);
    // const result = await store.show(1);
    expect(response.status).toEqual(200);
  });

  it("test /users get call", async () => {
    const response = await request.get("/users");
    expect(response.status).toEqual(401);
  });

  it("test /users/id get call", async () => {
    const response = await request.get(`/users/1`);
    expect(response.status).toEqual(401);
  });
});

describe("Testing user models", () => {
  const store = new UserStore();

  it("test index call in the model", async () => {
    const result = await store.index();
    expect(result.length).toEqual(3);
  });

  it("test show call in the model", async () => {
    const result = await store.show(1);
    expect(result.id).toEqual(1);
  });

  it("test create call in the model", async () => {
    const result = await store.create({
      firstName: "omar",
      lastName: "alsafadi",
      password: "12",
    });
    expect(result.id).toEqual(4);
  });
});
