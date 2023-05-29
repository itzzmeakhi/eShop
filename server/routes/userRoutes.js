import { Router } from 'express';

import { 
  authUser, 
  getUserProfile, 
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser 
} from './../controllers/userControllers.js';
import { protect, admin } from './../middleware/authMiddleware.js';

const router = Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/userslist').get(protect, admin, getUsers);
router.route('/remove/:id').delete(protect, admin, deleteUser);

export default router;