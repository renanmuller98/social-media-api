import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router = Router();

router.post('/register', createUser);
router.get('/users', getUsers);

export default router;
