import { IMessage } from '../interfaces/Message';

export function validateName(name: string): IMessage {
  if (!name) {
    return { message: '"name" is required' };
  }

  if (typeof name !== 'string') {
    return { message: '"name" must be a string' };
  }

  if (name.length <= 2) {
    return { message: '"name" length must be at least 3 characters long' };
  }

  return {};
}

export function validateAmount(amount: string): IMessage {
  if (!amount) {
    return { message: '"amount" is required' };
  }

  if (typeof amount !== 'string') {
    return { message: '"amount" must be a string' };
  }

  if (amount.length <= 2) {
    return { message: '"amount" length must be at least 3 characters long' };
  }

  return {};
}
