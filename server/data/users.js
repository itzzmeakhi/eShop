import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'Akhil Reddy',
    lastName: 'Mallidi',
    email: 'akhilmallidi.98@gmail.com',
    password: bcrypt.hashSync('AkHiL!777', 10),
    isAdmin: false
  }, {
    firstName: 'Admin',
    lastName: 'User 1',
    email: 'adminuser1@eshop.com',
    password: bcrypt.hashSync('Admin@123', 10),
    isAdmin: true
  }
];

export default users;