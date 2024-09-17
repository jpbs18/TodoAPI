import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  err: { status: number, message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error.';

  res.status(statusCode).json({
    status: 'error',
    message,
  });
};

export default errorMiddleware;
