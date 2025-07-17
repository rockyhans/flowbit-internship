const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/flowbit';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Clean slate
    await User.deleteMany();

    const users = [
      {
        email: 'admin@logistics.com',
        password: bcrypt.hashSync('password123', 10),
        role: 'Admin',
        customerId: 'LogisticsCo',
      },
      {
        email: 'admin@retail.com',
        password: bcrypt.hashSync('password123', 10),
        role: 'Admin',
        customerId: 'RetailGmbH',
      },
    ];

    await User.insertMany(users);
    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
