const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   GET /api/menu/
// @access  Public
module.exports.getMenu = async (req, res) => {
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

// @desc    Fetch all items on menu
// @route   POST /api/menu/markstock
// @access  MANAGEMENT
module.exports.markStock = async (req, res) => {
  const id = req.body.id;
  const selectItem = await Menu.findById(id);
  if (selectItem.outofstock === true) {
    const markedItem = await Menu.findByIdAndUpdate(id, {
      outofstock: false,
    });
    return res.send("Item has been set as Available.");
  } else if (selectItem.outofstock === false) {
    const markedItem = await Menu.findByIdAndUpdate(id, {
      outofstock: true,
    });
    return res.send("Item has been set as Out of Stock.");
  } else {
    return res.send("Failed to mark item.");
  }
};
