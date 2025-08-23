const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_LOGIN_EXPIRES, 10)
    ),
    secure: true,
    httpOnly: true,
    path: "/",
  };

  res.status(statusCode).cookie("jwt", token, options).json({
    success: true,
    message: "Login successful",
    token,
    user,
    role: user.role,
  });
};

module.exports = sendToken;
