const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'No bio provided'
    },
    profilePicture: {
        // URL to an (optional) profile picture. If not provided, a default image is used
        type: String,
        default: 'https://res.cloudinary.com/dk3b3ml2z/image/upload/v1617313636/Plantify/default-profile-picture_kjyqyv.png'
    },
    plantsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],

    totalSeeds: {
        //Total seeds from all posts
        type: Number,
        default: 0
    },
    plantsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }] 
    //Array of plants corresponding to the plants the user owns and maintains
}, { timestamps: true});


// Pre-save hook to hash the password before saving the user to the database
userSchema.pre('save', function (next) {
    // Check if the password has been modified (or new) to avoid rehashing the password when updating user details
    if (!this.isModified('password')) return next();

    // Salt and hash the password using bcrypt
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            // Replace the plain text password with the hash and call next
            this.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;