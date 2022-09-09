import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces/Product';

class ProductModel {
  constructor(public connection: Pool) {}

  public async create({ name, amount }: IProduct): Promise<IProduct> {
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);';

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      query,
      [name, amount],
    );

    return { id: insertId, name, amount };
  }

  public async findAll(): Promise<IProduct[]> {
    const query = 'SELECT * FROM Trybesmith.Products;';

    const [products] = await this.connection.execute(query);

    return products as IProduct[];
  }
}

export default ProductModel;
