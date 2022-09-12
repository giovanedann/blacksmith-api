import { IOrder } from '../interfaces/Order';
import connection from '../models/connection';
import OrderModel from '../models/OrderModel';

class OrdersService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async findAll(): Promise<IOrder[]> {
    const orders = await this.model.findAll();

    return orders;
  }

  public async create(userId: number): Promise<number> {
    const orderId = await this.model.create(userId);

    return orderId;
  }
}

export default OrdersService;
