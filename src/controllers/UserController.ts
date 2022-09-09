import { Request, Response } from 'express';
import UsersService from '../services/UserService';

class UserController {
  constructor(private service = new UsersService()) {
    this.create = this.create.bind(this);
  }

  public async create(request: Request, response: Response) {
    const { username, classe, password, level } = request.body;

    const token = await this.service.create({ username, classe, password, level });

    if (typeof token !== 'string') {
      return response
        .status(token.statusCode as number).json({ message: token.message });
    }

    if (token) {
      return response.status(201).json({ token });
    }
  }
}

export default new UserController();
