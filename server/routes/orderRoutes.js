import { Router } from 'express';

import { createOrder } from './../controllers/orderControllers.js';
import protect from './../middleware/authMiddleware.js';

const router = Router();

router.route('/').post(protect, createOrder);

export default router;