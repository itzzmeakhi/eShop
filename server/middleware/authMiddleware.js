import jwt from 'jsonwebtoken';

import User from './../models/User.js';

const protect = async (req, res, next) => {
  try {
    let token = '';

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await  User.findById(decoded.id).select('-password');
    }

    if(!token) {
      res.status(401);
      throw new Error('Not Authorized - no token');
    }

    next();
  } catch(err) {
    next(err);
  }
};

const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as admin');
    }
  } catch(err) {
    next(err);
  }
};

export { protect, admin };