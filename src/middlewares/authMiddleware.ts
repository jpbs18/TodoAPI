import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/utils';
import User from '../models/userModel';
import { JwtPayload } from 'jsonwebtoken';

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw { status: 401, message: 'You are not authenticated, please login.' };
  }

  try {
    const decodedToken = (await verifyToken(token)) as JwtPayload;
    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw { status: 404, message: 'Invalid token, please login.' };
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
