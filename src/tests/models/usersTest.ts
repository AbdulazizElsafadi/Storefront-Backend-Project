import { UserStore, User } from "../../models/user";

describe("Testing user model", () => {
  const store = new UserStore();
  it("test the index func to be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("should return an empty list of users", async () => {
    const result = await store.index();
    console.log("result:", result);
    expect(result).toEqual([]);
  });

  it("return a specific user successfully", async () => {
    const result = await store.show(1);
    const user: User = {
      id: 1,
      firstName: "abdulaziz",
      lastName: "aslafadi",
      password: "123456",
    };
    console.log("result:", result);
    expect(result).toEqual(user);
  });
});
