// File: utils/sendToken.js
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const sendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.COOKIE_LOGIN_EXPIRES || 864000000)),
    httpOnly: true, // prevents XSS attacks
    secure: process.env.NODE_ENV === 'production' // only send over HTTPS in production
};


    res.cookie('jwt', token, cookieOptions);

    // Remove password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

module.exports = sendToken;