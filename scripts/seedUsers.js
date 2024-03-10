require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../server/models/User'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedUsers();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const users = [
  {
    username: 'johnDoe',
    password: 'password123',
    email: 'johndoe@outlook.com',
    bio: 'Lover of all things green.',
  },
];

const seedUsers = async () => {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ ...user, password: hashedPassword });
    }
    console.log('Users seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding userzz:', error);
    mongoose.disconnect();
  }
};
