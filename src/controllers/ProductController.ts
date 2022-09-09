import { Request, Response } from 'express';
import ProductsService from '../services/ProductsService';

class ProductController {
  constructor(private service = new ProductsService()) {
    this.create = this.create.bind(this);
  }

  public async create(request: Request, response: Response) {
    const { name, amount } = request.body;

    const book = await this.service.create({ name, amount });

    if ('message' in book) {
      return response.status(book.statusCode as number).json({ message: book.message });
    }

    return response.status(201).json(book);
  }
}

export default new ProductController();
