import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ path: './config.env' });
const { JWT_SECRET, JWT_EXPIRATION } = process.env;

export const generateToken = (userId: string, email: string) => {
  return jwt.sign(
    { id: userId, email: email },
    JWT_SECRET || 'default_secret_key',
    { expiresIn: JWT_EXPIRATION || '1h' }
  );
};

export const verifyToken = async (token: string) =>
  jwt.verify(token, JWT_SECRET || 'default_secret_key');

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
