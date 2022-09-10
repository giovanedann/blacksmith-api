import connection from '../models/connection';
import { IMessage } from '../interfaces/Message';
import { ILogin, IUser } from '../interfaces/User';
import UserModel from '../models/UserModel';
import { validateUser } from '../helpers/validateUsers';
import generateToken from '../helpers/generateToken';

class UsersService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async login({ username, password }: ILogin): Promise<{ token: string } | IMessage> {
    if (!username) return ({ statusCode: 400, message: '"username" is required' });
    if (!password) return ({ statusCode: 400, message: '"password" is required' });
    
    const [user] = await this.model.findByLogin({ username, password });

    if (!user) return ({ statusCode: 401, message: 'Username or password invalid' });

    const token = generateToken({
      id: user.id as number,
      username: user.username,
    });

    return ({ token });
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
