import { ProductStore, Product } from "../../models/product";

describe("Testing product model", () => {
  const store = new ProductStore();
  it("test the index func to be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("should return an empty list of products", async () => {
    const result = await store.index();
    console.log("result:", result);
    expect(result).toEqual([]);
  });

  it("return a specific products successfully", async () => {
    const result = await store.show(1);
    const product: Product = {
      id: 1,
      name: "SIM card",
      price: 25,
    };
    console.log("result:", result);
    expect(result).toEqual(product);
  });
});
