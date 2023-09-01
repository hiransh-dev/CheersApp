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
const { joiOrdersSchema, JoiOrderId } = require("../utils/joi_schema");

const validateOrderSchema = (req, res, next) => {
  const { error } = joiOrdersSchema.validate(req.body);
  if (error) {
    const err_msg = error.details.map((er) => er.message).join(",");
    throw new expressError(err_msg, 400); /* 400 stand for bad request */
  } else {
    next();
  }
};

const validateOrderIdSchema = (req, res, next) => {
  const { error } = JoiOrderId.validate(req.body);
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
  validateOrderSchema,
  catchAsync(orderController.newOrder)
);
/* MANAGEMENT ROUTES */
router.get(
  "/userOrders",
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
router.patch(
  "/complete",
  isLoggedIn,
  isManagement,
  validateOrderIdSchema,
  catchAsync(orderController.completeOrder)
);
router.get(
  "/cancel/:date",
  isLoggedIn,
  isManagement,
  catchAsync(orderController.showCancelledOrders)
);
router.patch(
  "/cancel",
  isLoggedIn,
  isManagement,
  validateOrderIdSchema,
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
