import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw { status: 400, message: 'User id is necessary as parameter' };
    }

    const user = await User.findById(userId);
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    return res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
