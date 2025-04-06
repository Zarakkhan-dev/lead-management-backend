import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user_model';
import { generateToken } from '../utils/generateToken';

export const signup = async (req: Request, res: Response): Promise<Response | void> => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({
    user: { _id: user._id, name: user.name, email: user.email },
    token: generateToken(user._id.toString()),
  });
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({
    user: { _id: user._id, name: user.name, email: user.email },
    token: generateToken(user._id.toString()),
  });
};

export const forgotPassword = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Password reset successfully' });
};
