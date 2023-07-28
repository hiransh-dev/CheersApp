const express = require("express");
const router = express.Router();
const path = require("path");

/* manageRoute's Controller */
const orderController = require("../controllers/orderController");

/* Error Handling */
const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/ExpressError");

// MIDDLEWARES
const { isLoggedIn, isNotManagement } = require(path.join(
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

/* MANAGEMENT ROUTES */
router.get(
  "/",
  isLoggedIn,
  isNotManagement,
  catchAsync(orderController.getOrders)
);
router.post(
  "/new",
  isLoggedIn,
  isNotManagement,
  catchAsync(orderController.newOrder)
);

module.exports = router;
