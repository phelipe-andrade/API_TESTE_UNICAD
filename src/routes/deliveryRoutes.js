import { Router } from 'express';
import deliveryController from '../controllers/DeliveryController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, deliveryController.index);
router.post('/', loginRequired, deliveryController.register);
router.delete('/:id', loginRequired, deliveryController.delete);
router.patch('/:id', loginRequired, deliveryController.edit);

export default router;
