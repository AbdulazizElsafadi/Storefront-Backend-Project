import express, { Request, Response } from "express";
import { ProductStore, Product } from "../models/product";
import verifyToken from "../middlewares/verifyToken";
require("dotenv").config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const result = await store.index();
  return res.json(result);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id as unknown as Number);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyToken, create);
};

export default product_routes;
