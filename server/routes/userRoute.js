import express from 'express';
import {
  deleteUser,
  followUser,
  getUser,
  getUsers,
  unFollowUser,
  updateUser,
} from '../controller/UserController.js';

const router = express.Router();
router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/unFollow', unFollowUser);
export default router;
