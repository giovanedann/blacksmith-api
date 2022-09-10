import { sign } from 'jsonwebtoken';

interface IPayload {
  [payloadKey: string]: string | number;
}

export default function generateToken(payload: IPayload): string {
  const JWT_SECRET = 'segredofoda123@';

  const token = sign({ payload }, JWT_SECRET, {
    expiresIn: '2d',
  });

  return token;
}