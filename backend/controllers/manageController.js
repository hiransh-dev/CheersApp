const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   GET /api/manage/menu/
// @access  Management
module.exports.getMenu = async (req, res) => {
  const fullMenu = await Menu.find({}).sort({ subcategory: "ascending" });
  res.json(fullMenu);
};

// @desc    Create new item on menu
// @route   POST /api/manage/menu/
// @access  Management
module.exports.setMenu = async (req, res) => {
  const new_menuItem = new Menu(req.body.menuItem);
  const savedMenuItem = await new_menuItem.save();
  res.json(savedMenuItem);
};
