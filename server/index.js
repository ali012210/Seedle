require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGO_URI = "mongodb+srv://ali012210:Eid3433417@seedle-dev.2r8bul2.mongodb.net/?retryWrites=true&w=majority&appName=Seedle-Dev";
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected'));
db.on('error', (err) => console.log('MongoDB connection error: ', err));
db.on('disconnected', () => console.log('MongoDB disconnected'));

const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
const errorHandlingMiddleware = require('./middleware/errorMiddleware');

// Import routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Middleware
app.use(cors()); // Enable All CORS Requests
app.use(express.json()); // for parsing application/json
app.use(errorHandlingMiddleware);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

