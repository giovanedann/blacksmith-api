import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces/Product';

class ProductModel {
  constructor(public dbConnection: Pool) {}

  public async create({ name, amount }: IProduct): Promise<IProduct> {
    const query = 'INSERT INTO TrybeSmith.Products (name, amount) VALUES (?, ?)';

    const [{ insertId }] = await this.dbConnection.execute<ResultSetHeader>(
      query,
      [name, amount],
    );

    return { id: insertId, name, amount };
  }
}

export default ProductModel;
