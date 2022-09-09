import { IMessage } from '../interfaces/Message';

export function validateName(name: string): IMessage {
  if (!name) {
    return { statusCode: 400, message: '"name" is required' };
  }

  if (typeof name !== 'string') {
    return { statusCode: 422, message: '"name" must be a string' };
  }

  if (name.length <= 2) {
    return { statusCode: 422, message: '"name" length must be at least 3 characters long' };
  }

  return {};
}

export function validateAmount(amount: string): IMessage {
  if (!amount) {
    return { statusCode: 400, message: '"amount" is required' };
  }

  if (typeof amount !== 'string') {
    return { statusCode: 422, message: '"amount" must be a string' };
  }

  if (amount.length <= 2) {
    return { statusCode: 422, message: '"amount" length must be at least 3 characters long' };
  }

  return {};
}
