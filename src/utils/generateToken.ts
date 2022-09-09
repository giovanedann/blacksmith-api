import { sign } from 'jsonwebtoken';

export default function generateToken(username: string, classe: string): string {
  const JWT_SECRET = 'segredofoda123@';

  const token = sign({ payload: { username, classe } }, JWT_SECRET, {
    expiresIn: '2d',
  });

  return token;
}