const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   GET /api/menu/
// @access  Public
module.exports.getMenu = async (req, res) => {
  if (req.user && (req.user.isAdmin === true || req.user.isStaff === true)) {
    const fullMenu = await Menu.find({}).sort({
      subcategory: "ascending",
    });
    return res.json(fullMenu);
  } else {
    const fullMenu = await Menu.find({ itemDeleted: false }).sort({
      subcategory: "ascending",
    });
    return res.json(fullMenu);
  }
};

// @desc    Fetch all items on menu
// @route   GET /api/menu/:id
// @access  Public
module.exports.getMenuItem = async (req, res) => {
  const id = req.params.id;
  const fullMenu = await Menu.findById(id).sort({
    subcategory: "ascending",
  });
  if (fullMenu.itemDeleted === false) {
    return res.json(fullMenu);
  } else {
    return res.send("Problem fetching menu item.");
  }
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

// @desc    Fetch all deleted items on menu
// @route   GET /api/menu/delete
// @access  ADMIN
module.exports.getDeletedMenu = async (req, res) => {
  const fullMenu = await Menu.find({ itemDeleted: true }).sort({
    subcategory: "ascending",
  });
  res.json(fullMenu);
};

// @desc    Marks items as deleted on menu
// @route   POST /api/menu/delete
// @access  ADMIN
module.exports.itemDelete = async (req, res) => {
  const id = req.body.id;
  const selectItem = await Menu.findById(id);
  if (selectItem.itemDeleted === true) {
    const markedItem = await Menu.findByIdAndUpdate(id, {
      itemDeleted: false,
    });
    return res.send("Item has been Restored.");
  } else if (selectItem.itemDeleted === false) {
    const markedItem = await Menu.findByIdAndUpdate(id, {
      itemDeleted: true,
    });
    return res.send("Item has been deleted.");
  } else {
    return res.send("Failed to Delete/Restore item.");
  }
};
