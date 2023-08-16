const User = require("../models/dbUsers");

// @desc    Register New User
// @route   GET /api/user/register
// @access  Public
module.exports.registerUser = async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber } =
    req.body.registerUser;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send("User Already Exists");
  }
  const newUser = new User({
    email,
    username: email,
    firstName,
    lastName,
    phoneNumber,
  });
  // newUser.username = newUser.email;
  const userCreated = await User.register(newUser, password);
  if (!userCreated) {
    return res.send("Account Creation Failed");
  } else {
    const {
      email,
      firstName,
      lastName,
      message = "Account has been created.",
    } = userCreated;
    return res.json({ email, firstName, lastName, message });
  }
};

// @desc    Login User
// @route   GET /api/user/login
// @access  Public
module.exports.loginUser = async (req, res, next) => {
  const checkManagementUser = await User.findById(req.user._id);
  if (
    checkManagementUser.isAdmin === true ||
    checkManagementUser.isStaff === true
  ) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    return res.send("Cannot use management account. Go to Management Login.");
  } else {
    const { email, firstName, lastName, fullName, phoneNumber } = req.user;
    return res.json({ email, firstName, lastName, phoneNumber, fullName });
  }
};

// @desc    Check for Logged in User
// @route   GET /api/user/check
// @access  Private
module.exports.checkUser = (req, res) => {
  if (req.user.isAdmin === true || req.user.isStaff === true) {
    const { username, isAdmin, isStaff } = req.user;
    res.json({ username, isAdmin, isStaff });
  } else {
    const { email, firstName, lastName, fullName, phoneNumber } = req.user;
    return res.json({ email, firstName, lastName, phoneNumber, fullName });
  }
};

// @desc    Logout User
// @route   GET /api/user/logout
// @access  Private
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send("Logged out");
  });
};

// @desc    LOGIN FOR ADMIN/STAFF
// @route   POST /api/user/managementlogin/
// @access  MANAGEMENT
module.exports.managementLogin = async (req, res) => {
  const { username, isAdmin, isStaff } = req.user;
  const managementLoginUser = await User.findById(req.user._id);
  if (
    managementLoginUser.isAdmin === true ||
    managementLoginUser.isStaff === true
  ) {
    return res.json({ username, isAdmin, isStaff });
  } else {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    return res.send(
      "User/Customers cannot login into Management Section. Go to User Login."
    );
  }
};

// @desc    LOGIN FOR ADMIN/STAFF
// @route   POST /api/user/registerstaff
// @access  MANAGEMENT
module.exports.managementRegister = async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber } =
    req.body.registerUser;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send("User Already Exists");
  }
  const newStaff = new User({
    email,
    username: email,
    firstName,
    lastName,
    phoneNumber,
    isStaff: true,
  });
  const newStaffCreated = await User.register(newStaff, password);
  if (!newStaffCreated) {
    return res.send("Account Creation Failed");
  } else {
    const {
      email,
      firstName,
      lastName,
      message = "New Management Account has been created.",
    } = newStaffCreated;
    return res.json({ email, firstName, lastName, message });
  }
};

// @desc    Get All Users
// @route   GET /api/user/allusers
// @access  MANAGEMENT
module.exports.allusers = async (req, res) => {
  const allUsersInfo = await User.find({});
  res.json(allUsersInfo);
};

// @desc    Get All Users
// @route   GET /api/user/allusers
// @access  MANAGEMENT
module.exports.getUser = async (req, res) => {
  const id = req.params.id;
  const allUsersInfo = await User.findById(id);
  res.json(allUsersInfo);
};

// @desc    Get Management
// @route   GET /api/user/management
// @access  ADMIN
module.exports.managementUser = async (req, res) => {
  const getManagementUsersInfo = await User.find({
    $or: [
      {
        isStaff: true,
      },
      {
        isAdmin: true,
      },
    ],
  });
  res.json(getManagementUsersInfo);
};

// @desc    Get Management
// @route   GET /api/user/deletestaff
// @access  ADMIN
module.exports.deleteStaffAcc = async (req, res) => {
  const id = req.body.id;
  const staffToDelete = await User.findById(id);
  if (staffToDelete.isStaff === true && staffToDelete.isAdmin === false) {
    const staffDeleted = await User.findByIdAndDelete(id);
    if (staffDeleted) {
      return res.send("Staff Accound Deleted:" + staffToDelete.email);
    } else {
      return res.send("Error deleting staff Account.");
    }
  } else {
    return res.send("User is not a staff Account.");
  }
};
