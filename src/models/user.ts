import client from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface User {
  id: Number;
  firstName: string;
  lastName: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connect = await client.connect();

      const sql = "SELECT id, firstName, lastName FROM users";

      const result = await connect.query(sql);

      connect.release();

      return result.rows;
    } catch (error) {
      throw new Error(`error getting users ${error}`);
    }
  }

  async show(id: Number): Promise<User> {
    try {
      const sql = "SELECT id, firstName, lastName FROM users WHERE id=($1)";
      // @ts-ignore
      const connect = await client.connect();

      // TODO: REMOVE CONSOLE
      console.log(connect.query);

      const result = await connect.query(sql, [id]);

      connect.release();

      // TODO: REMOVE CONSOLES
      console.log("result:", result);
      console.log("rows:", result.rows);

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, username, password";

      const { pepper, saltRounds } = process.env;

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [u.firstName, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      throw new Error(`error creating a user: ${error}`);
    }
  }
}
