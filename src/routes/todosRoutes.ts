import express from 'express';
import {
  addTodo,
  deleteTodoById,
  updateTodoStateById,
  getUserTodos,
  getUserTodoById,
} from '../controllers/todosController';
const router = express.Router();

router
  .get('/', getUserTodos)
  .get('/:todoId', getUserTodoById)
  .put('/:todoId', updateTodoStateById)
  .post('/', addTodo)
  .delete('/:todoId', deleteTodoById);

export default router;
