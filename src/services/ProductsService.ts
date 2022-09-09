import { IProduct } from '../interfaces/Product';
import ProductModel from '../models/ProductModel';
import connection from '../models/connection';
import { IMessage } from '../interfaces/Message';
import { validateAmount, validateName } from '../utils/validateProducts';

class ProductsService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async create({ name, amount }: IProduct): Promise<IProduct | IMessage> {
    const nameWarning = validateName(name);
    const amountWarning = validateAmount(amount);

    if (nameWarning.message || amountWarning.message) {
      return ({
        statusCode: nameWarning.statusCode ?? amountWarning.statusCode,
        message: nameWarning.message ?? amountWarning.message,
      });
    }

    const createdBook = await this.model.create({ name, amount });

    return createdBook;
  }
}

export default ProductsService;
