const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   GET /api/menu/
// @access  Public
module.exports.getMenu = async (req, res) => {
  const fullMenu = await Menu.find({}).sort({
    subcategory: "ascending",
  });
  res.json(fullMenu);
};
