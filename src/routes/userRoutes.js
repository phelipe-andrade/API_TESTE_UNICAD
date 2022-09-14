import { Router } from 'express';
import userController from '../controllers/UserController';

const router = new Router();

router.post('/', userController.login);
router.post('/token', userController.token);
router.post('/register', userController.register);

export default router;
