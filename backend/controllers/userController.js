const User = require("../models/dbUsers");

// @desc    Register New User
// @route   GET /api/user/register
// @access  Public
module.exports.registerUser = async (req, res, next) => {
  const { email, firstName, lastName, pwd, phoneNumber } =
    req.body.registerUser;
  const newUser = new User({ email, firstName, lastName, phoneNumber });
  await User.register(newUser, pwd);
  res.send("User Registered");
};

// @desc    Login User
// @route   GET /api/user/login
// @access  Public
module.exports.login = (req, res) => {
  res.send("User Logged in");
};
