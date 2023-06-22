const express = require("express");
const router = express.Router();

/* manageRoute's Controller */
const manageController = require("../controllers/manageController");

/* Error Handling */
const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/ExpressError");

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
router.get("/menu", catchAsync(manageController.manageMenu));
router.post(
  "/menu",
  validateMenuSchema,
  catchAsync(manageController.addMenuItem)
);

module.exports = router;
