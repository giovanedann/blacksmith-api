import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/UserModel';

export interface IDecodedJWT {
  payload: {
    id: number;
    username: string;
  };
  [key: string]: any;
}

async function authorizate(request: Request, response: Response, next: NextFunction) {
  const JWT_SECRET = 'segredofoda123@';
  const { authorization } = request.headers;

  const model = new UserModel(connection);

  if (!authorization) return response.status(401).json({ message: 'Token not found' });

  try {
    const { payload } = verify(authorization, JWT_SECRET) as IDecodedJWT;
    const [userExists] = await model.findById(payload.id);
    if (userExists) {
      request.userId = payload.id;
      next(); 
    }
  } catch (e) {
    return response.status(401).json({ message: 'Invalid token' });
  }
}

export default authorizate;