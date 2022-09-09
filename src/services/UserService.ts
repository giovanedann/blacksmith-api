import connection from '../models/connection';
import { IMessage } from '../interfaces/Message';
import { IUser } from '../interfaces/User';
import UserModel from '../models/UserModel';
import { validateUser } from '../helpers/validateUsers';

class UsersService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create({ username, classe, password, level }: IUser): Promise<string | IMessage> {
    const { message, statusCode } = validateUser({ username, classe, password, level });

    if (message) {
      return { message, statusCode };
    }

    const token = await this.model.create({ username, classe, password, level });

    return token;
  }
}

export default UsersService;
