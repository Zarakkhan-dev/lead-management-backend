import jwt from 'jsonwebtoken';
import { config } from '../configs/config';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '1d' });
};
