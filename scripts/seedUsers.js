const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to where your User model is located

mongoose.connect('process.env.MONGO_URI', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


const users = [
  {
    username: 'johnDoe',
    password: 'password123',
    email: 'johndoe@example.com',
    bio: 'Lover of all things green.',
    profilePicture: 'https://example.com/path/to/johns-pic.jpg',
    plantsOwned: [], // Assuming you'll add ObjectIds referencing the Plants collection here
  },
  // Add more user objects as needed
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
    console.error('Error seeding users:', error);
    mongoose.disconnect();
  }
};

seedUsers();

