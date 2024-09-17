import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
const xss =  require('xss-clean');
import authRoutes from './routes/authRoutes';
import todosRoutes from './routes/todosRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import usersRoutes from './routes/usersRoutes';
import limiter from './utils/rateLimiter';

dotenv.config({ path: './config.env' });
const { PORT, MONGO_CONNECTION_STRING } = process.env;

if (!MONGO_CONNECTION_STRING) {
  throw new Error(
    'MONGO_CONNECTION_STRING is not defined in the environment variables.'
  );
}

const app = express();
app.use(helmet());
app.use('/api', limiter);
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todos', authMiddleware, todosRoutes);
app.use('/api/v1/users', usersRoutes);
app.use(errorMiddleware);

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => console.log('MongoDB connection successfull.'))
  .catch((error: Error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
