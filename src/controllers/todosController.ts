import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import Task from '../models/taskModel';

export const addTodo = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { description } = req.body;

    if (!description) {
      throw { status: 400, message: 'Task description is required.' };
    }

    const newTask = await Task.create({
      description,
      user: req.user._id,
      completed: false,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { tasks: newTask._id },
    });

    res.status(200).json({
      status: 'success',
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodoById = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      throw { status: 400, message: 'Todo id is required as parameter.' };
    }

    const deletedTodo = await Task.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      throw { status: 404, message: 'Todo not found.' };
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { tasks: todoId },
    });

    res.status(200).json({
      status: 'success',
      message: 'Todo deleted succesfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodoStateById = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      throw { status: 400, message: 'Todo id is required as parameter.' };
    }

    const todo = await Task.findById(todoId);
    if (!todo) {
      throw { status: 404, message: 'Todo not found.' };
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTodos = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw { status: 404, message: 'User not found.' };
    }

    const todos = await Task.find({ user: user._id });

    return res.status(200).json({
      status: 'success',
      data: {
        todos,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTodoById = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw { status: 404, message: 'User not found.' };
    }

    const { todoId } = req.params;
    if (!todoId) {
      throw { status: 404, message: 'Todo not found.' };
    }

    const todo = await Task.findById(todoId);

    return res.status(200).json({
      status: 'success',
      data: {
        todo,
      },
    });
  } catch (error) {
    next(error);
  }
};
