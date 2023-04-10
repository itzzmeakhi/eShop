import { Router } from 'express';

import { createOrder, getOrderDetailsById } from './../controllers/orderControllers.js';
import protect from './../middleware/authMiddleware.js';

const router = Router();

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrderDetailsById);

export default router;