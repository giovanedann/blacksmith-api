import { Request, Response } from 'express';
import UsersService from '../services/UserService';

class UserController {
  constructor(private service = new UsersService()) {
    this.create = this.create.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  public async authenticate(request: Request, response: Response) {
    const { username, password } = request.body;

    const token = await this.service.login({ username, password });

    if ('statusCode' in token) {
      return response
        .status(token.statusCode as number).json({ message: token.message });
    }

    return response.status(200).json(token);
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
