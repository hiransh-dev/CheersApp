const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   GET /api/menu/
// @access  Public
module.exports.getMenu = async (req, res) => {
  const fullMenu = await Menu.find({}).sort({ subcategory: "ascending" });
  res.json(fullMenu);
};

// @desc    Fetch all items on menu
// @route   GET /api/menu/manage
// @access  ADMIN
module.exports.manageMenu = async (req, res) => {
  const fullMenu = await Menu.find({}).sort({ subcategory: "ascending" });
  res.json(fullMenu);
};

// @desc    Create new item on menu
// @route   POST /api/menu/new
// @access  ADMIN
module.exports.addMenuItem = async (req, res) => {
  const new_menuItem = new Menu(req.body.menuItem);
  const savedMenuItem = await new_menuItem.save();
  res.json(savedMenuItem);
};
