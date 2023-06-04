import { Router } from 'express';

import { 
  createOrder, 
  getOrderDetailsById, 
  getOrders,
  getAllOrders 
} from './../controllers/orderControllers.js';
import { admin, protect } from './../middleware/authMiddleware.js';

const router = Router();

router.route('/').post(protect, createOrder);
router.route('/').get(protect, getOrders);
router.route('/admin').get(protect, admin, getAllOrders);
router.route('/:id').get(protect, getOrderDetailsById);

export default router;