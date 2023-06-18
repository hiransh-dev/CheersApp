const Menu = require("../models/dbMenu");

module.exports.getMenu = async (req, res) => {
  const fullMenu = await Menu.find({}).sort({ subcategory: "ascending" });
  res.json(fullMenu);
};

module.exports.setMenu = async (req, res) => {
  const new_menuItem = new Menu(req.body.menuItem);
  const savedMenuItem = await new_menuItem.save();
  res.json(savedMenuItem);
};
