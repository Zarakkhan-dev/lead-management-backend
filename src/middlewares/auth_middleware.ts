import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../configs/config';
import { User } from '../models/user_model';

export const protect = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Not authorized, no token');
    const decoded = jwt.verify(token,config.jwtSecret as string) as { id: string };
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) throw new Error('User not found');
    next();
  } catch (err: any) {
    res.status(401).json({ message: 'Not authorized' });
  }
};
