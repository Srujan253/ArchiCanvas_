// File: middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Changed from userSchema for convention
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    
    if (!token) {
        return next(new ErrorHandler("You are not logged in. Please log in to get access.", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return next(new ErrorHandler("The user belonging to this token does no longer exist.", 401));
        }

        if (currentUser.isPasswordChanged(decoded.iat)) {
            return next(new ErrorHandler("User recently changed password. Please log in again.", 401));
        }

        // Grant access to protected route
        req.user = currentUser;
        next();
    } catch (error) {
        return next(new ErrorHandler("Unauthorized, token is invalid or has expired.", 401));
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler("You do not have permission to perform this action.", 403));
        }
        next();
    };
};

// Add this to middleware/auth.js
const Community = require('../models/community.model');


exports.isCommunityCreator = async (req, res, next) => {
    try {
        const community = await Community.findById(req.params.id);
        
        if (!community) {
            return next(new ErrorHandler('Community not found.', 404));
        }

        // Check if the logged-in user's ID matches the community's creator ID
        if (community.creator.toString() !== req.user.id.toString()) {
            return next(new ErrorHandler('You are not authorized to perform this action.', 403));
        }
        
        // If they are the creator, attach the community to the request to avoid a second database call
        req.community = community;
        next();

    } catch (error) {
        next(error);
    }
};