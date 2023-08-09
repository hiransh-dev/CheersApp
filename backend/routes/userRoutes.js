const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

/* userRoute 's Controller */
const userController = require("../controllers/userController");

/* Error Handling */
const catchAsync = require("../utils/catchAsync");
const expressError = require(path.join(__dirname, "../utils/ExpressError"));

// MIDDLEWARES
const { isNotLoggedIn, isLoggedIn, isManagement } = require(path.join(
  __dirname,
  "../utils/middleware.js"
));

/* JOI Schema for Middleware */
const { joiUserSchema } = require("../utils/joi_schema");

const validateUserSchema = (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body);
  if (error) {
    const err_msg = error.details.map((er) => er.message).join(",");
    throw new expressError(err_msg, 400); /* 400 stand for bad request */
  } else {
    next();
  }
};

/* USER ROUTES  */
// REGISTER ROUTE
router.post(
  "/register",
  validateUserSchema,
  isNotLoggedIn,
  catchAsync(userController.registerUser)
);
// LOGIN ROUTE
router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("local"),
  catchAsync(userController.loginUser)
);
// CHECK FOR LOGGED IN USER ROUTE
router.get("/check", isLoggedIn, userController.checkUser);
// LOGOUT ROUTE
router.get("/logout", isLoggedIn, userController.logout);
// GET ALL USERS
router.get(
  "/allusers",
  isLoggedIn,
  isManagement,
  catchAsync(userController.allusers)
);
// GET ALL USERS
router.get(
  "/managementusers",
  isLoggedIn,
  isManagement,
  catchAsync(userController.managementUser)
);

module.exports = router;
