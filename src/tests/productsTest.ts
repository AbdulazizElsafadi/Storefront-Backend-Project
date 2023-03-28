import { ProductStore, Product } from "../models/product";
import supertest from "supertest";
import app from "../server";

beforeAll(async () => {
  const productStore = new ProductStore();
  await productStore.create({ name: "product1", price: 100 });
});

describe("Testing product handlers", () => {
  const store = new ProductStore();
  const request = supertest(app);

  it("test the index func to be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("test /products post call", async () => {
    const product: Product = {
      name: "product1",
      price: 5,
    };
    const response = await request.post("/products").send(product);

    expect(response.status).toEqual(401);
  });

  it("test /products get call", async () => {
    const response = await request.get("/products");
    expect(response.status).toEqual(200);
  });

  it("test /products/id get call", async () => {
    const response = await request.get(`/products/1`);
    expect(response.status).toEqual(200);
  });
});

describe("Testing product models", () => {
  const store = new ProductStore();

  it("test index call in the model", async () => {
    const result = await store.index();
    expect(result.length).toEqual(1);
  });

  it("test create call in the model", async () => {
    const result = await store.create({
      name: "product2",
      price: 10,
    });
    expect(result.id).toEqual(2);
    expect(result.name).toEqual("product2");
    expect(result.price).toEqual(10);
  });

  it("test show call in the model", async () => {
    const result = await store.show(2);
    expect(result.name).toEqual("product2");
    expect(result.price).toEqual(10);
  });
});
