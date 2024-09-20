import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { generateToken } from '../utils/utils';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw {
        status: 400,
        message:
          'Invalid credentials or missing credentials, please try again.',
      };
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw {
        status: 400,
        message:
          'That email is being used already, enter a different email please.',
      };
    }

    if(password.length < 8){
       throw {
         status: 400,
         message:
           'Password has to have at least 8 characters.',
       };
    }

    const newUser = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
        token: generateToken(newUser._id.toString(), newUser.email),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw {
        status: 400,
        message:
          'Invalid credentials or missing credentials, please try again.',
      };
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw {
        status: 404,
        message: 'That email does not exist, please sign up first.',
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw { status: 401, message: 'Incorrect password, please try again.' };
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
        token: generateToken(user._id.toString(), user.email),
      },
    });
  } catch (error) {
    next(error);
  }
};
