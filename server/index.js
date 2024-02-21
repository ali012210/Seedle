require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected'));
db.on('error', (err) => console.log('MongoDB connection error: ', err));
db.on('disconnected', () => console.log('MongoDB disconnected'));

const express = require('express');
const app = express();

// Import routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

// Middleware
app.use(express.json()); // for parsing application/json

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

