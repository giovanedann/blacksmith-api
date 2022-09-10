import { Request, Response } from 'express';
import OrdersService from '../services/OrdersService';

class OrderController {
  constructor(private service = new OrdersService()) {
    this.index = this.index.bind(this);
  }

  public async index(_request: Request, response: Response) {
    const orders = await this.service.findAll();

    return response.status(200).json(orders);
  }
}

export default new OrderController();
