const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        // Get user input
        const { email, password, username } = req.body;

        // Validate user input
        if (!(email && password && username)) {
            return res.status(400).send('All details must be provided');
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists. Please Login' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await User.create({
        username,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: hashedPassword,
        });

        // Create a JWT token for new user
        const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
            expiresIn: '2h',
        }
        );

        // Assign the JWT token to the user (not saved to the database)
        user.token = token;

        // Respond with user data (excluding password)
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Login user
exports.login = async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            return res.status(400).json({ message: 'Username and Password input required' });
        }

        // Attempt to locate user in database
        const user = await User.findOne ({ username });

        // If user is found and password is correct
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create a new JWT token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2h',
                }
            );

            // Save the JWT token to the user and respond with user data (excluding password)
            user.token = token;
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

