import { OrderStore, Order, Order_Products } from "../models/order";
import supertest from "supertest";
import app from "../server";

describe("Testing order handlers", () => {
  const store = new OrderStore();
  const request = supertest(app);

  it("test the index func to be defined", () => {
    expect(store.index).toBeDefined();
  });

  it("test /orders post call", async () => {
    const order: Order = {
      user_id: 1,
      status: "completed",
    };

    const response = await request.post("/orders").send(order);
    expect(response.status).toEqual(401);
  });

  it("test /orders get call", async () => {
    const response = await request.get("/orders");
    expect(response.status).toEqual(401);
  });

  it("test /orders/:order_id/products post call", async () => {
    const response = await request.post(`/orders/1/products`);
    expect(response.status).toEqual(401);
  });

  it("test /orders/users/:user_id/current get call", async () => {
    const response = await request.get(`/orders/users/1/current`);
    expect(response.status).toEqual(401);
  });
});

describe("Testing order models", () => {
  const store = new OrderStore();

  it("test index call in the model", async () => {
    const result = await store.index();
    expect(result.length).toEqual(0);
  });

  it("test create call in the model", async () => {
    const order: Order = {
      user_id: 1,
      status: "active",
    };
    const result = await store.create(order);
    expect(result.id).toEqual(1);
  });

  it("test addProduct call in the model", async () => {
    const order_products: Order_Products = {
      order_id: 1,
      product_id: 1,
      quantity: 1,
    };
    const result = await store.addProduct(order_products);
    expect(result.id).toEqual(1);
  });

  it("test currentOrders call in the model", async () => {
    const result = await store.currentOrders(1);
    expect(result).toBeDefined();
  });
});
