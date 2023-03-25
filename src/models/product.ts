import client from "../database";

export interface Product {
  id?: Number;
  name: string;
  price: Number;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connect = await client.connect();

      const sql = "SELECT * FROM products";

      const result = await connect.query(sql);

      connect.release();

      return result.rows;
    } catch (error) {
      throw new Error(`error getting products ${error}`);
    }
  }

  async show(id: Number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
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
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO products(name, price) VALUES($1, $2) RETURNING *";

      const result = await conn.query(sql, [product.name, product.price]);
      const newProduct = result.rows[0];

      conn.release();
      return newProduct;
    } catch (error) {
      throw new Error(`error creating a newProduct: ${error}`);
    }
  }
}
