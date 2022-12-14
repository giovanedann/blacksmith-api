import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IOrder } from '../interfaces/Order';

class OrderModel {
  constructor(public connection: Pool) {}

  public async findAll(): Promise<IOrder[]> {
    const query = `
      SELECT orders.id, orders.userId, JSON_ARRAYAGG(products.id) as productsIds
      FROM Trybesmith.Orders as orders
      INNER JOIN Trybesmith.Products as products
      ON orders.id = products.orderId
      GROUP BY orders.id
      ORDER BY orders.userId;
    `;

    const [orders] = await this.connection.execute(query);

    return orders as IOrder[];
  }

  public async create(userId: number) {
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?);';

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(query, [userId]);

    return insertId;
  }
}

export default OrderModel;
