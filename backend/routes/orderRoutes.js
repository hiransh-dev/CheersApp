const express = require("express");
const router = express.Router();
const path = require("path");

/* manageRoute's Controller */
const orderController = require("../controllers/orderController");

/* Error Handling */
const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/ExpressError");

// MIDDLEWARES
const { isLoggedIn, isNotManagement, isManagement } = require(path.join(
  __dirname,
  "../utils/middleware.js"
));

/* JOI Schema for Middleware */
const { joiOrderSchema } = require("../utils/joi_schema");

const validateOrderSchema = (req, res, next) => {
  const { error } = joiOrderSchema.validate(req.body);
  if (error) {
    const err_msg = error.details.map((er) => er.message).join(",");
    throw new expressError(err_msg, 400); /* 400 stand for bad request */
  } else {
    next();
  }
};

// USER ROUTES
router.get(
  "/",
  isLoggedIn,
  isNotManagement,
  catchAsync(orderController.getOrders)
);
router.get(
  "/pending",
  isLoggedIn,
  isNotManagement,
  catchAsync(orderController.getPendingOrders)
);
router.post(
  "/new",
  isLoggedIn,
  isNotManagement,
  catchAsync(orderController.newOrder)
);
/* MANAGEMENT ROUTES */
router.get(
  "/user/:id",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.getUserOrders)
);
router.get(
  "/allpending",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.pendingOrders)
);
router.post(
  "/complete",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.completeOrder)
);
router.get(
  "/cancel/:date",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.showCancelledOrders)
);
router.post(
  "/cancel",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.cancelOrder)
);
router.get(
  "/allorders/:date",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.showAllOrders)
);
router.get(
  "/chart",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.chart)
);
router.get(
  "/chartcancel",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.chartcancel)
);

module.exports = router;
