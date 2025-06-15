import { Router } from 'express';
import { createUser, getUsers, loginUser } from '../controllers/userController';

const router = Router();

router.post('/register', createUser);
router.get('/users', getUsers);
router.post('/login', loginUser);

export default router;
