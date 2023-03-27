import express, { Request, Response } from "express";
import { OrderStore, Order, Order_Products } from "../models/order";
import verifyToken from "../middlewares/verifyToken";
require("dotenv").config();

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  const result = await store.index();
  res.json(result);
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const orderProduct: Order_Products = {
    order_id: parseInt(req.params.order_id),
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  };

  try {
    const newOrderProduct = await store.addProduct(orderProduct);
    res.json(newOrderProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const currentUserOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id: Number = req.params.user_id as unknown as Number;
    const currentOrders = await store.currentOrders(user_id);
    res.json(currentOrders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", verifyToken, index);
  app.post("/orders", verifyToken, create);
  app.post("/orders/:order_id/products", verifyToken, addProduct);
  app.get("/orders/users/:user_id/current", verifyToken, currentUserOrders);
};

export default order_routes;
