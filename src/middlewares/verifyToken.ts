import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

require("dotenv").config();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];

    jwt.verify(token as string, process.env.TOKEN_SIGNATURE as string);
    next();
  } catch (error) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};

export default verifyAuthToken;
