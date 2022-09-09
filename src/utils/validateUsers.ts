import { IMessage } from '../interfaces/Message';
import { IUser } from '../interfaces/User';

export function validatePassword(password: string): IMessage {
  if (!password) {
    return { statusCode: 400, message: '"password" is required' };
  }

  if (typeof password !== 'string') {
    return { statusCode: 422, message: '"password" must be a string' };
  }

  if (password.length < 8) {
    return {
      statusCode: 422,
      message: '"password" length must be at least 8 characters long',
    };
  }

  return {};
}

export function validateClass(className: string): IMessage {
  if (!className) {
    return { statusCode: 400, message: '"classe" is required' };
  }

  if (typeof className !== 'string') {
    return { statusCode: 422, message: '"classe" must be a string' };
  }

  if (className.length <= 2) {
    return {
      statusCode: 422,
      message: '"classe" length must be at least 3 characters long',
    };
  }

  return {};
}

export function validateUsername(username: string): IMessage {
  if (!username) {
    return { statusCode: 400, message: '"username" is required' };
  }

  if (typeof username !== 'string') {
    return { statusCode: 422, message: '"username" must be a string' };
  }

  if (username.length <= 2) {
    return {
      statusCode: 422,
      message: '"username" length must be at least 3 characters long',
    };
  }

  return {};
}

export function validateLevel(level: string): IMessage {
  if (typeof level !== 'number' && !level) {
    return { statusCode: 400, message: '"level" is required' };
  }

  if (typeof level !== 'number') {
    return { statusCode: 422, message: '"level" must be a number' };
  }

  if (level <= 0) {
    return {
      statusCode: 422,
      message: '"level" must be greater than or equal to 1',
    };
  }

  return {};
}

export function validateUser({ username, classe, level, password }: IUser): IMessage {
  const [isUsernameValid, isClassValid, isLevelValid, isPasswordValid] = [
    validateUsername(username),
    validateClass(classe),
    validateLevel(level),
    validatePassword(password),
  ];

  if (isUsernameValid.message) return isUsernameValid;
  if (isClassValid.message) return isClassValid;
  if (isLevelValid.message) return isLevelValid;
  if (isPasswordValid.message) return isPasswordValid;
  return {};
}
