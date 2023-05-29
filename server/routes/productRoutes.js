import { Router } from 'express';

import { getProducts, getProductById, removeProductById } from './../controllers/productControllers.js';
import { protect, admin } from './../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, admin, removeProductById);

export default router;