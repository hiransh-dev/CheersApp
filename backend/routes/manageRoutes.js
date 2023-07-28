const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

/* manageRoute's Controller */
const manageController = require("../controllers/manageController");

/* Error Handling */
const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/ExpressError");

// MIDDLEWARES
const { isNotLoggedIn, isLoggedIn, isUserAdmin } = require(path.join(
  __dirname,
  "../utils/middleware.js"
));

/* JOI Schema for Middleware */
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

/* MANAGEMENT ROUTES */
// STAFF/ADMIN LOGIN ROUTE
router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("local"),
  catchAsync(manageController.manageLogin)
);
// STAFF REGISTER ROUTE
router.post("/register", isUserAdmin, manageController.manageRegisterStaff);
// FULL MENU VIEW MANAGEMENT ROUTE
router.get("/menu", catchAsync(manageController.manageMenu));
// ADD NEW ITEM IN MENU ROUTE
router.post(
  "/menu/new",
  isUserAdmin,
  validateMenuSchema,
  catchAsync(manageController.addMenuItem)
);

module.exports = router;
