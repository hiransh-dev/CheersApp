const Menu = require("../models/dbMenu");

module.exports.getMenu = async (req, res) => {
  const selectedCategory = req.params.category;
  const fullMenu = await Menu.find({ category: selectedCategory }).sort({
    subcategory: "ascending",
  });
  res.json(fullMenu);
};
