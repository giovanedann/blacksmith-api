import { IProduct } from '../interfaces/Product';
import ProductModel from '../models/ProductModel';
import connection from '../models/connection';
import { IMessage } from '../interfaces/Message';
import { validateAmount, validateName } from '../helpers/validateProducts';

class ProductsService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create({ name, amount }: IProduct): Promise<IProduct | IMessage> {
    const nameWarning = validateName(name);
    const amountWarning = validateAmount(amount);

    if (nameWarning.message || amountWarning.message) {
      return {
        statusCode: nameWarning.statusCode ?? amountWarning.statusCode,
        message: nameWarning.message ?? amountWarning.message,
      };
    }

    const createdBook = await this.model.create({ name, amount });

    return createdBook;
  }

  public async updateMany(productsId: number[], orderId: number): Promise<number[] | IMessage > {
    if (!productsId) return { statusCode: 400, message: '"productsIds" is required' };
    if (!Array.isArray(productsId)) {
      return { statusCode: 422, message: '"productsIds" must be an array' };
    }
    if (!productsId.length) {
      return { statusCode: 422, message: '"productsIds" must include only numbers' };
    }

    const productsIds = await Promise.all(productsId.map(async (id) => {
      const productId = await this.model.update(id, orderId);
      return productId;
    }));

    return productsIds;
  }

  public async findAll(): Promise<IProduct[]> {
    const products = await this.model.findAll();

    return products;
  }
}

export default ProductsService;
