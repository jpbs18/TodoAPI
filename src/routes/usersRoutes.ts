import express from 'express';
import { getUsers, getUserById } from '../controllers/usersController';
const router = express.Router();

router.get('/', getUsers).get('/:userId', getUserById);

export default router;
