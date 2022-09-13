import { sign } from 'jsonwebtoken';

interface IPayload<T> {
  [payloadKey: string]: T;
}

export default function generateToken<T>(payload: IPayload<T>): string {
  const JWT_SECRET = 'segredofoda123@';

  const token = sign({ payload }, JWT_SECRET, {
    expiresIn: '2d',
  });

  return token;
}
