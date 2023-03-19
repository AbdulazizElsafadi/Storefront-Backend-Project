import client from "../database";

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
      const connect = await Client.connect();

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
}
