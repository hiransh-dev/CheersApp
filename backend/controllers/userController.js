const User = require("../models/dbUsers");

// @desc    Register New User
// @route   GET /api/user/register
// @access  Public
module.exports.registerUser = async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber } =
    req.body.registerUser;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send("User Exists");
  }
  const newUser = new User({
    email,
    firstName,
    lastName,
    phoneNumber,
  });
  newUser.username = newUser.email;
  await User.register(newUser, password);
  res.send("User Registered");
};

// @desc    Login User
// @route   GET /api/user/login
// @access  Public
module.exports.loginUser = async (req, res, next) => {
  res.send("User " + req.user.fullName + " Logged in");
};

// @desc    Logout User
// @route   GET /api/user/logout
// @access  Private
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // req.flash("success", "Goodbye!");
    res.redirect("/");
  });
};
