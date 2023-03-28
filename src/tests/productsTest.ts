import { ProductStore, Product } from "../models/product";
import { User } from "../models/user";
import supertest from "supertest";
import app from "../server";

describe("Testing product handlers", () => {
  const store = new ProductStore();
  const request = supertest(app);

  //   beforeAll(async () => {
  //     const user: User = {
  //       firstName: "abdulaziz",
  //       lastName: "alsafadi",
  //       password: "123",
  //     };
  //     const response = await request.post("/users").send(user);
  //     const token = response.text.slice(1, -1);
  //     // .split(" ")[1].slice(0, -1);
  //   });

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
    const result = await store.show(1);
    expect(result.name).toEqual("product1");
    expect(result.price).toEqual(100);
  });
});
