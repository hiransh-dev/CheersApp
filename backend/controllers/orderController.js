const Order = require("../models/dbOrders");
const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   POST /api/order/
// @access  Private
module.exports.newOrder = async (req, res) => {
  console.log(req.body.order);
  // const order = req.body.order;
  // const new_order = new Order();
  // for (items of order) {

  // }
  // const placedOrder = await new_order.save();
};
