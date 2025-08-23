// File: controllers/auth.controller.js
const User = require('../models/user.model');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler'); // Assuming you have this

// REGISTER (Using the logic from before)
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, type, specialization, bio } = req.body;
        if (!name || !email || !password || !type) return next(new ErrorHandler('Please provide all required fields.', 400));
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(new ErrorHandler('An account with this email already exists.', 409));

        const userData = { name, email, password, role: type };
        if (type === 'artist') {
            if (!specialization) return next(new ErrorHandler('Specialization is required for artists.', 400));
            userData.specialization = specialization;
            userData.bio = bio;
        }

        const newUser = await User.create(userData);
        
        // Don't log in the user, just send a success message
        res.status(201).json({
            status: 'success',
            message: 'Registration successful! Your account is pending admin approval.',
        });
    } catch (error) {
        next(error);
    }
};

// LOGIN
exports.login = async (req, res, next) => {
    try {
        console.log(req.body , "hiii");//hiii
        const { email, password } = req.body;
        if (!email || !password) return next(new ErrorHandler('Please provide email and password.', 400));

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new ErrorHandler('Incorrect email or password111111.', 401));
        }

     console.log(user , "hiii");//hiii
        // For artists, check if their account is approved
        if (user.role === 'artist' && user.status !== 'approved') {
            return next(new ErrorHandler('Your account is still pending approval.', 403));
        }
        
        
        // If everything is ok, send token to client
        sendToken(user, 200, res);

    } catch (error) {
        next(error);
    }
};

// LOGOUT
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};
const Product = require('../models/Product');
const { calculateBadges } = require('../utils/badgeLogic');

// --- Get Badges for the Logged-in User ---
exports.getMyBadges = async (req, res, next) => {
    try {
        // Get the logged-in user's ID from the auth middleware
        console.log("jidfidiidifidsii",req.user);

        const userId = req.user._id;
        console.log(userId);

        // Efficiently count the number of products created by this user
        const productCount = await Product.countDocuments({ user: userId });
        console.log(productCount,"hiiiii");

        // Calculate which badges have been earned based on the count
        const earnedBadges = calculateBadges(productCount);

        res.status(200).json({
            success: true,
            productCount,
            badges: earnedBadges
        });

    } catch (error) {
        next(error);
    }
};