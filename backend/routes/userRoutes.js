const express = require("express");
const router = express.Router();
const path = require("path");

const passport = require("passport");

const catchAsync = require("../utils/catchAsync");
const expressError = require(path.join(__dirname, "../utils/ExpressError"));

/* userRoute 's Controller */
const userController = require("../controllers/userController");

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

/* USER ROUTES */
router.post(
  "/register",
  validateUserSchema,
  catchAsync(userController.registerUser)
);
/* post name=username,name=password */
router.post(
  "/login",
  passport.authenticate("local"),
  catchAsync(userController.loginUser)
);
/* Verify login before logout */
router.get("/logout", userController.logout);

module.exports = router;
