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
const {
  isNotLoggedIn,
  isLoggedIn,
  isManagement,
  isUserAdmin,
} = require(path.join(__dirname, "../utils/middleware.js"));

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
  isNotLoggedIn,
  validateUserSchema,
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

/* MANAGEMENT ROUTES */
// STAFF/ADMIN LOGIN ROUTE
router.post(
  "/managementlogin",
  isNotLoggedIn,
  passport.authenticate("local"),
  catchAsync(userController.managementLogin)
);
// STAFF REGISTER ROUTE
router.post(
  "/registerstaff",
  isLoggedIn,
  isUserAdmin,
  validateUserSchema,
  catchAsync(userController.managementRegister)
);
// GET ALL USERS INFO
router.get(
  "/allusers",
  isLoggedIn,
  isManagement,
  catchAsync(userController.allusers)
);
// GET SPECIFIC USER'S INFO
router.get(
  "/info/:id",
  isLoggedIn,
  isManagement,
  catchAsync(userController.getUser)
);
// GET ALL MANAGEMENT USERS INFO
router.get(
  "/managementusers",
  isLoggedIn,
  isManagement,
  catchAsync(userController.managementUser)
);
// GET ALL MANAGEMENT USERS INFO
router.post(
  "/deletestaff",
  isLoggedIn,
  isUserAdmin,
  catchAsync(userController.deleteStaffAcc)
);

module.exports = router;
