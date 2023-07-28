const Menu = require("../models/dbMenu");
const User = require("../models/dbUsers");

const path = require("path");
const expressError = require(path.join(__dirname, "../utils/ExpressError"));

// @desc    LOGIN FOR ADMIN/STAFF
// @route   POST /api/manage/login/
// @access  Management
module.exports.manageLogin = async (req, res) => {
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
// @route   POST /api/manage/register/
// @access  ADMIN
module.exports.manageRegisterStaff = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } =
    req.body.registerStaff;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send("User Exists");
  }
  const newStaff = new User({
    email,
    username: email,
    firstName,
    lastName,
    phoneNumber,
    isStaff: true,
  });
  // newStaff.username = newStaff.email;
  const newStaffCreated = User.register(newStaff, password);
  if (!newStaffCreated) {
    throw new expressError("Staff Account creation failed", 400);
  } else {
    const { email, firstName, lastName, isStaff } = newStaffCreated;
    res.json({ email, firstName, lastName, isStaff });
  }
};

// @desc    Fetch all items on menu
// @route   GET /api/manage/menu/
// @access  ADMIN/STAFF
module.exports.manageMenu = async (req, res) => {
  const fullMenu = await Menu.find({}).sort({ subcategory: "ascending" });
  res.json(fullMenu);
};

// @desc    Create new item on menu
// @route   POST /api/manage/menu/
// @access  ADMIN
module.exports.addMenuItem = async (req, res) => {
  const new_menuItem = new Menu(req.body.menuItem);
  const savedMenuItem = await new_menuItem.save();
  res.json(savedMenuItem);
};
