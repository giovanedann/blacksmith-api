import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser } from '../interfaces/User';
import generateToken from '../helpers/generateToken';

class UserModel {
  constructor(public connection: Pool) {}

  public async create({ username, classe, level, password }: IUser): Promise<string> {
    const query = `
      INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?);
    `;

    await this.connection.execute<ResultSetHeader>(
      query,
      [username, classe, level, password],
    );

    const token = generateToken(username, classe);

    return token;
  }
}

export default UserModel;
