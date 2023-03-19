import bcrypt from 'bcryptjs';

import User from './../models/User.js';
import generateToken from '../utils/generateToken.js';

const registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
      res.status(400);
      throw new Error('User already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await  bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      password: hashedPassword,
      email
    });

    if(user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch(err) {
    next(err);
  }
};

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch(err) {
    next(err);
  }
}; 

const getUserProfile = async(req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if(user) {
      res.json({
        _id: user._id,
        name: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch(err) {
    next(err);
  }
};

export { 
  authUser, 
  getUserProfile,
  registerUser 
};