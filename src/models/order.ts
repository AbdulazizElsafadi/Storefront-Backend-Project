import client from "../database";

export interface Order {
  id?: Number;
  user_id: Number;
  status: string;
}

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *";

      const result = await conn.query(sql, [order.user_id, order.status]);
      const newOrder = result.rows[0];

      conn.release();
      return newOrder;
    } catch (error) {
      throw new Error(`error creating a newOrder: ${error}`);
    }
  }
}
