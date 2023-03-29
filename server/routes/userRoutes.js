import { Router } from 'express';

import { 
  authUser, 
  getUserProfile, 
  registerUser,
  updateUserProfile 
} from './../controllers/userControllers.js';
import protect from './../middleware/authMiddleware.js';

const router = Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

export default router;