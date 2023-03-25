import express, { Request, Response } from "express";
import { OrderProductsStore, Order_Products } from "../models/order_products";
import verifyToken from "../middlewares/verifyToken";
require("dotenv").config();

const store = new OrderProductsStore();

const create = async (req: Request, res: Response) => {
  try {
    const order_product: Order_Products = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };

    const newOrderProduct = await store.create(order_product);

    res.json(newOrderProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderProducts_routes = (app: express.Application) => {
  app.post("/order_products", verifyToken, create);
};

export default orderProducts_routes;
