require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

// Connect to MongoDB

// Create a new MongoClient
const client = new MongoClient(MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
});

async function run() {
    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection by sending ping
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

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

