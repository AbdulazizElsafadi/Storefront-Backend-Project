import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  ENV,
} = process.env;

let client: Pool = new Pool();

console.log("ENV:", ENV);

if (ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
