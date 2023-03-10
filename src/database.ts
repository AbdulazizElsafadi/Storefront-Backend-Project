import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } =
  process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});
export default client;
