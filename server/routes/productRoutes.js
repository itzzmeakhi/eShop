import { Router } from 'express';

import { 
  getProducts, 
  getProductById, 
  removeProductById,
  createANewProduct,
  updateProductById 
} from './../controllers/productControllers.js';
import { protect, admin } from './../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(getProducts);
router.route('/').post(protect, admin, createANewProduct);
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, admin, removeProductById);
router.route('/:id').put(protect, admin, updateProductById);

export default router;