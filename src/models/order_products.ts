import client from "../database";

export interface Order_Products {
  id?: Number;
  order_id: Number;
  product_id: Number;
  quantity: Number;
}

export class OrderProductsStore {
  async create(order_product: Order_Products): Promise<Order_Products> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO Order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";

      const result = await conn.query(sql, [
        order_product.order_id,
        order_product.product_id,
        order_product.quantity,
      ]);
      const newOrderProduct = result.rows[0];

      conn.release();
      return newOrderProduct;
    } catch (error) {
      throw new Error(`error creating a newOrderProduct: ${error}`);
    }
  }
}
