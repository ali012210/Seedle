require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected'));
db.on('error', (err) => console.log('MongoDB connection error: ', err));
db.on('disconnected', () => console.log('MongoDB disconnected'));

const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss');
const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
const errorHandlingMiddleware = require('./middleware/errorMiddleware');

// Import routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const plantRoutes = require('./routes/plantRoutes');
const tagRoutes = require('./routes/tagRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/auth', authRoutes);

// Middleware
app.use(cors()); // Enable All CORS Requests
app.use(express.json()); // for parsing application/json
app.use(helmet()); // Secure HTTP headers
app.use(xss()); // Sanitize user input
app.use(errorHandlingMiddleware);

// Start server
const PORT = process.env.PORT || 3000; // Use Heroku's dynamic port or default to 3000 if not available
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


