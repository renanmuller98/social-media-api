import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPosts,
} from '../controllers/postController';

const router = Router();

router.post('/post', createPost);
router.get('/posts', getPosts);
router.delete('/post/:id', deletePost);

export default router;
