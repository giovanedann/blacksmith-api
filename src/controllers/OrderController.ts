import { Request, Response } from 'express';
import OrdersService from '../services/OrdersService';
import ProductsService from '../services/ProductsService';

class OrderController {
  constructor(private service = new OrdersService()) {
    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
  }

  public async index(_request: Request, response: Response) {
    const orders = await this.service.findAll();

    return response.status(200).json(orders);
  }

  public async store(request: Request, response: Response) {
    const { userId } = request;
    const { productsIds } = request.body;

    const insertId = await this.service.create(userId as number);

    const productService = new ProductsService();
    const products = await productService.updateMany(productsIds, insertId);
    
    if ('message' in products) {
      return response.status(products.statusCode as number).json({ message: products.message });
    }

    return response.status(201).json({ userId, productsIds });
  }
}

export default new OrderController();
