import { UserStore, User } from "../../models/user";

describe("testing user model", () => {
  const store = new UserStore();
  it("test the index func to be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("should return a list of users", async () => {
    const result = await store.index();
    console.log("result:", result);
    expect(result).toEqual([]);
  });
});
