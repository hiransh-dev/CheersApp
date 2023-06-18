const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   GET /api/menu/:category
// @access  Public
module.exports.getMenu = async (req, res) => {
  const selectedCategory = req.params.category;
  const fullMenu = await Menu.find({ category: selectedCategory }).sort({
    subcategory: "ascending",
  });
  res.json(fullMenu);
};
