import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser, ILogin } from '../interfaces/User';
import generateToken from '../helpers/generateToken';

class UserModel {
  constructor(public connection: Pool) {}

  public async findById(id: number): Promise<IUser[] | []> {
    const query = 'SELECT * FROM Trybesmith.Users WHERE id=(?);';

    const [user] = await this.connection.execute(query, [id]);

    return user as IUser[];
  }

  public async findByLogin({ username, password }: ILogin): Promise<IUser[] | []> {
    const query = 'SELECT * FROM Trybesmith.Users WHERE username=(?) AND password=(?);';

    const [user] = await this.connection.execute(query, [username, password]);

    return user as IUser[];
  }
  
  public async create({ username, classe, level, password }: IUser): Promise<string> {
    const query = `
      INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?);
    `;

    await this.connection.execute<ResultSetHeader>(
      query,
      [username, classe, level, password],
    );

    const token = generateToken({ username });

    return token;
  }
}

export default UserModel;
