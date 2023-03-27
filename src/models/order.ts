import client from "../database";

export interface Order {
  id?: Number;
  user_id: Number;
  status: string;
}

export interface Order_Products {
  id?: Number;
  order_id: Number;
  product_id: Number;
  quantity: Number;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connect = await client.connect();

      const sql = "SELECT * FROM orders";

      const result = await connect.query(sql);

      connect.release();

      return result.rows;
    } catch (error) {
      throw new Error(`error getting orders ${error}`);
    }
  }

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

  async addProduct(orderProduct: Order_Products): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${orderProduct.product_id} to order ${orderProduct.order_id}:${err}`
      );
    }
  }

  async currentOrders(user_id: Number): Promise<Order[]> {
    try {
      const connect = await client.connect();
      const sql =
        "SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.user_id=($1) AND status='active'";
      const result = await connect.query(sql, [user_id]);

      const currentOrders = result.rows;

      connect.release;
      return currentOrders;
    } catch (error) {
      console.log("error getting current orders:", error);
      throw new Error(`couldn't get current order: ${error}`);
    }
  }
}
