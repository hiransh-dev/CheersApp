const Order = require("../models/dbOrders");
const User = require("../models/dbUsers");
const Menu = require("../models/dbMenu");

// @desc    FETCH USERS ALL ORDER HISTORY
// @route   GET /api/order/
// @access  PRIVATE
module.exports.getOrders = async (req, res) => {
  if (req.user) {
    const curUserOrder = await User.findById(req.user._id).populate({
      path: "orderHistory",
      populate: {
        path: "orderItems.item",
      },
      options: { sort: { _id: -1 }, limit: 25 },
    });
    const curUserOrderHistory = curUserOrder.orderHistory;
    res.json(curUserOrderHistory);
  } else {
    res.send("Error fetching user orders.");
  }
  // Need to add pagination with populate to fetch more than 25 orders
};

// @desc    FETCH ALL USER PENDING ORDERS
// @route   GET /api/order/pending
// @access  PRIVATE
module.exports.getPendingOrders = async (req, res) => {
  if (req.user) {
    const curUserOrder = await Order.find({
      author: req.user._id,
      orderStatus: false,
    })
      .populate({ path: "orderItems.item" })
      .sort({ _id: -1 });
    // const curUserOrderHistory = curUserOrder.orderHistory;
    res.json(curUserOrder);
  } else {
    res.send("Error fetching user orders.");
  }
};

// @desc    FETCH USER's ALL ORDERS FOR MANAGEMENT BY USER_ID
// @route   GET /api/order/user/:id
// @access  MANAGEMENT
module.exports.getUserOrders = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const curUserOrder = await User.findById(id).populate({
      path: "orderHistory",
      populate: {
        path: "orderItems.item",
      },
      options: { sort: { _id: -1 }, limit: 25 },
    });
    const curUserOrderHistory = curUserOrder.orderHistory;
    res.json(curUserOrderHistory);
  } else {
    res.send("Error fetching pending user orders.");
  }
  // Need to add pagination with populate to fetch more than 25 orders
};

// @desc    CREATE A NEW ORDER
// @route   POST /api/order/new
// @access  PRIVATE
module.exports.newOrder = async (req, res) => {
  // ORDER SIDE
  const order = req.body.order;
  const new_order = new Order();
  let total = 0;
  for (let item of order.order) {
    const menuItem = await Menu.findById(item.id);
    if (menuItem && menuItem.outofstock === false) {
      new_order.orderItems.push({
        item: menuItem,
        quantity: item.quantity,
      });
      total = total + menuItem.price * item.quantity;
    } else {
      return res.send(
        "One of the items in your order is unavailable: " + menuItem.title
      );
    }
    new_order.tableNo = req.body.order.tableNo;
    new_order.orderTotal = parseFloat(total);
    new_order.orderStatus = 0;
    new_order.paymentStatus = 1;
    new_order.author = req.user._id;
    // USER SIDE ORDER HISTORY
    const curUserOrder = await User.findById(req.user._id);
    curUserOrder.orderHistory.push(new_order);
    // SAVE BOTH
    const placedOrder = await new_order.save();
    await curUserOrder.save();
    res.json({ id: placedOrder._id });
    // res.send("Order has been placed.");
  }
};

// @desc    FETCH ALL PENDING ORDERS
// @route   GET /api/order/allpending
// @access  MANAGEMENT
module.exports.pendingOrders = async (req, res) => {
  const allPendingOrders = await Order.find({
    orderStatus: false,
    orderCancel: false,
  })
    .populate({
      path: "orderItems.item",
    })
    .populate({
      path: "author",
      select: "firstName lastName email phoneNumber",
    })
    .sort({ _id: -1 });
  res.json(allPendingOrders);
};

// @desc    SET AN ORDER AS COMPLETE
// @route   POST /api/order/complete
// @access  MANAGEMENT
module.exports.completeOrder = async (req, res) => {
  const id = req.body.id;
  const acceptedOrder = await Order.findByIdAndUpdate(id, {
    orderStatus: true,
  });
  res.send("Order has been set as fulfilled.");
};

// @desc    GET ALL COMPLETED ORDERS BY DATE
// @route   GET /api/order/allorders/:date
// @access  MANAGEMENT
module.exports.showAllOrders = async (req, res) => {
  const dateOrders = new Date(req.params.date);
  const allOrders = await Order.find({
    orderStatus: true,
    createdAt: {
      $gte: dateOrders.setHours(0, 0, 0, 0),
      $lt: dateOrders.setHours(23, 59, 59, 999),
    },
  })
    .populate({
      path: "orderItems.item",
    })
    .populate({
      path: "author",
      select: "firstName lastName email phoneNumber",
    })
    .sort({ _id: -1 });
  res.json(allOrders);
};

// @desc    SET AN ORDER AS CANCELLED
// @route   POST /api/order/cancel
// @access  MANAGEMENT
module.exports.cancelOrder = async (req, res) => {
  const id = req.body.id;
  const cancelledOrder = await Order.findByIdAndUpdate(id, {
    orderCancel: true,
  });
  res.send("Order has been set as cancelled.");
};

// @desc    GET ALL COMPLETED ORDERS BY DATE
// @route   GET /api/order/allorders/:date
// @access  MANAGEMENT
module.exports.showCancelledOrders = async (req, res) => {
  const dateOrders = new Date(req.params.date);
  const allOrders = await Order.find({
    orderCancel: true,
    createdAt: {
      $gte: dateOrders.setHours(0, 0, 0, 0),
      $lt: dateOrders.setHours(23, 59, 59, 999),
    },
  })
    .populate({
      path: "orderItems.item",
    })
    .populate({
      path: "author",
      select: "firstName lastName email phoneNumber",
    })
    .sort({ _id: -1 });
  res.json(allOrders);
};

// @desc    FETCH ORDER_TOTAL OF LAST 7 DAYS, TO PLOT ON CHART
// @route   GET /api/order/chart
// @access  MANAGEMENT
module.exports.chart = async (req, res) => {
  const daysOfOrders = 7;
  const dateOrders = new Date();
  const ordersTotalArr = [];
  const allOrders = await Order.find({
    orderStatus: true,
    createdAt: {
      $gte: dateOrders.setDate(dateOrders.getDate() - daysOfOrders),
    },
  }).select("orderTotal createdAt");
  //
  // FIRST DRAFT OF CHART CODE
  // BOTH HAVE SAME OUTPUT, BUT LATTER MAYBE MORE PERFORMANT WITH O(n)
  //
  // let tempDate1;
  // let tempTotal1 = 0;
  // for (let i = allOrders.length - 1; i >= 0; i--) {
  //   let tempTotal2 = 0;
  //   let tempDate2 = new Date(allOrders[i].createdAt).getDate();
  //   if (tempDate1 !== tempDate2) {
  //     for (let j = allOrders.length - 1; j >= 0; j--) {
  //       let tempDate3 = new Date(allOrders[j].createdAt).getDate();
  //       if (tempDate2 === tempDate3) {
  //         tempTotal2 = tempTotal2 + allOrders[j].orderTotal;
  //       }
  //     }
  //   }
  //   if (tempTotal2 !== tempTotal1) {
  //     ordersTotalArr.unshift(tempTotal2);
  //     tempTotal1 = tempTotal2;
  //   }
  //   temp1 = new Date(allOrders[i].createdAt).getDate();
  // }
  if (allOrders.length !== 0) {
    let tempDate1 = new Date(allOrders[0].createdAt).getDate();
    let tempTotal = 0;
    for (let i = 0; i < allOrders.length; i++) {
      let tempDate2 = new Date(allOrders[i].createdAt).getDate();
      if (tempDate1 === tempDate2) {
        tempTotal = parseFloat(tempTotal + allOrders[i].orderTotal);
      } else {
        ordersTotalArr.push(tempTotal);
        tempTotal = allOrders[i].orderTotal;
        tempDate1 = new Date(allOrders[i].createdAt).getDate();
      }
      if (i === allOrders.length - 1) {
        ordersTotalArr.push(tempTotal);
      }
    }
    for (let i = ordersTotalArr.length; i < daysOfOrders; i++) {
      ordersTotalArr.unshift(0);
    }
    res.json(ordersTotalArr);
  }
};

// @desc    FETCH ORDER_TOTAL OF LAST 7 DAYS, TO PLOT ON CHART
// @route   GET /api/order/chartcancel
// @access  MANAGEMENT
module.exports.chartcancel = async (req, res) => {
  const daysOfOrders = 7;
  const dateOrders = new Date();
  const ordersTotalArr = [];
  const allOrders = await Order.find({
    orderCancel: true,
    createdAt: {
      $gte: dateOrders.setDate(dateOrders.getDate() - daysOfOrders),
    },
  }).select("orderTotal createdAt");
  //
  // FIRST DRAFT OF CHART CODE
  // BOTH HAVE SAME OUTPUT, BUT LATTER MAYBE MORE PERFORMANT WITH O(n)
  //
  // let tempDate1;
  // let tempTotal1 = 0;
  // for (let i = allOrders.length - 1; i >= 0; i--) {
  //   let tempTotal2 = 0;
  //   let tempDate2 = new Date(allOrders[i].createdAt).getDate();
  //   if (tempDate1 !== tempDate2) {
  //     for (let j = allOrders.length - 1; j >= 0; j--) {
  //       let tempDate3 = new Date(allOrders[j].createdAt).getDate();
  //       if (tempDate2 === tempDate3) {
  //         tempTotal2 = tempTotal2 + allOrders[j].orderTotal;
  //       }
  //     }
  //   }
  //   if (tempTotal2 !== tempTotal1) {
  //     ordersTotalArr.unshift(tempTotal2);
  //     tempTotal1 = tempTotal2;
  //   }
  //   temp1 = new Date(allOrders[i].createdAt).getDate();
  // }
  if (allOrders.length !== 0) {
    let tempDate1 = new Date(allOrders[0].createdAt).getDate();
    let tempTotal = 0;
    for (let i = 0; i < allOrders.length; i++) {
      let tempDate2 = new Date(allOrders[i].createdAt).getDate();
      if (tempDate1 === tempDate2) {
        tempTotal = parseFloat(tempTotal + allOrders[i].orderTotal);
      } else {
        ordersTotalArr.push(tempTotal);
        tempTotal = allOrders[i].orderTotal;
        tempDate1 = new Date(allOrders[i].createdAt).getDate();
      }
      if (i === allOrders.length - 1) {
        ordersTotalArr.push(tempTotal);
      }
    }
    for (let i = ordersTotalArr.length; i < daysOfOrders; i++) {
      ordersTotalArr.unshift(0);
    }
    res.json(ordersTotalArr);
  }
};
