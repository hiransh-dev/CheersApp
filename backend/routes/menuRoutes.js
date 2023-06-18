const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

/* menuRoute 's Controller */
const menuController = require("../controllers/menuController");

/* MENU ROUTES */
router.get("/:category", catchAsync(menuController.getMenu));

module.exports = router;
