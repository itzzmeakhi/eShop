import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

import users from './data/users.js';
import products from './data/products.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers.find(user => user.isAdmin);
    
    const mappedProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(mappedProducts);

    console.log('Data imported!');
    process.exit();
  } catch (err) {
    console.log(`Err! ${err}`);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data deleted!');
    process.exit();
  } catch (err) {
    console.log(`Err! ${err}`);
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}


