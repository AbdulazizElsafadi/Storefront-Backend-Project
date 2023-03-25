import express, { Request, Response } from "express";
import { OrderStore, Order } from "../models/order";
import verifyToken from "../middlewares/verifyToken";
require("dotenv").config();

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
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

const order_routes = (app: express.Application) => {
  app.post("/orders", verifyToken, create);
};

export default order_routes;
