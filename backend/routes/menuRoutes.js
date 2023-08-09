const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const path = require("path");

/* MenuRoute's Controller */
const menuController = require("../controllers/menuController");

// MIDDLEWARES
const { isLoggedIn, isUserAdmin } = require(path.join(
  __dirname,
  "../utils/middleware.js"
));

const { joiMenuSchema } = require("../utils/joi_schema");

const validateMenuSchema = (req, res, next) => {
  const { error } = joiMenuSchema.validate(req.body);
  if (error) {
    const err_msg = error.details.map((er) => er.message).join(",");
    throw new expressError(err_msg, 400); /* 400 stand for bad request */
  } else {
    next();
  }
};

/* MENU ROUTES */
router.get("/", catchAsync(menuController.getMenu));
// FULL MENU VIEW MANAGEMENT ROUTE
router.get("/menu", catchAsync(menuController.manageMenu));
// ADD NEW ITEM IN MENU ROUTE
router.post(
  "/menu/new",
  isLoggedIn,
  isUserAdmin,
  validateMenuSchema,
  catchAsync(menuController.addMenuItem)
);

module.exports = router;
