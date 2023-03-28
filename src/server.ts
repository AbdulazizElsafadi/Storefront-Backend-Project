import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config();

import users_routes from "./handlers/user";
import product_routes from "./handlers/products";
import order_routes from "./handlers/orders";
const app: express.Application = express();

const corsOptions = {
  origin: "localhost",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

users_routes(app);
product_routes(app);
order_routes(app);

app.listen(process.env.PORT, function () {
  console.log(`starting app on: ${process.env.PORT}`);
});

export default app;
