import express, { Request, Response } from "express";
import { UserStore, User } from "../models/user";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken";
require("dotenv").config();

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  const result = await store.index();
  res.json(result);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const user = await store.show(req.params.id as unknown as Number);
  res.json(user);
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    const newUser = await store.create(user);

    const token =
      "Bearer " + jwt.sign(newUser, process.env.TOKEN_SIGNATURE as string);

    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const users_routes = (app: express.Application) => {
  app.get("/users", verifyToken, index);
  app.get("/users/:id", verifyToken, show);
  app.post("/users", create);
};

export default users_routes;
