const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const path = require("path");

/* MenuRoute's Controller */
const menuController = require("../controllers/menuController");

// MIDDLEWARES
const { isLoggedIn, isManagement, isUserAdmin } = require(path.join(
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
// GET MENU
router.get("/", catchAsync(menuController.getMenu));
// GET MENU ITEM
router.get("/item/:id", catchAsync(menuController.getMenuItem));
// ADD NEW ITEM IN MENU
router.post(
  "/new",
  isLoggedIn,
  isUserAdmin,
  validateMenuSchema,
  catchAsync(menuController.addMenuItem)
);
// MARK ITEM AS OUT OF STOCK
router.put(
  "/markstock",
  isLoggedIn,
  isManagement,
  catchAsync(menuController.markStock)
);
// GET DELETED ITEMS FROM MENU
router.get(
  "/delete",
  isLoggedIn,
  isManagement,
  catchAsync(menuController.getDeletedMenu)
);
// DELETE ITEM IN MENU
router.put(
  "/delete",
  isLoggedIn,
  isUserAdmin,
  catchAsync(menuController.itemDelete)
);
module.exports = router;
