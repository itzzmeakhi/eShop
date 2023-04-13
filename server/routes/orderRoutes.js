import { Router } from 'express';

import { createOrder, getOrderDetailsById, getOrders } from './../controllers/orderControllers.js';
import protect from './../middleware/authMiddleware.js';

const router = Router();

router.route('/').post(protect, createOrder);
router.route('/').get(protect, getOrders);
router.route('/:id').get(protect, getOrderDetailsById);

export default router;