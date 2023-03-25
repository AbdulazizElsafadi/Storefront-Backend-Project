import client from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface User {
  id?: Number;
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

      const result = await connect.query(sql, [id]);

      connect.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";

      const { BCRYPT_SECRET, saltRounds } = process.env;

      const hash = bcrypt.hashSync(
        u.password + BCRYPT_SECRET,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
      const user = result.rows[0];

      conn.release();
      return user;
    } catch (error) {
      throw new Error(`error creating a user: ${error}`);
    }
  }
}
