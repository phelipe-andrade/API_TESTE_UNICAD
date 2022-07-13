import { Router } from 'express';
import loginRequied from '../middlewares/loginRequired';
import photoController from '../controllers/PhotoController';

const router = new Router();

router.post('/', loginRequied, photoController.store);

export default router;
