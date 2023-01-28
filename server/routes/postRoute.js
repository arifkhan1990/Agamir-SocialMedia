import express from 'express';
import {
  createPost,
  deletePost,
  disLikePost,
  getPost,
  getPosts,
  getTimeLinePost,
  likePost,
  updatePost,
} from '../controller/PostController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.get('/', getPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.put('/:id/dislike', disLikePost);
router.get('/:id/timeline', getTimeLinePost);
export default router;
