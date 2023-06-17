const dotenv = require("dotenv");

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const mongoose = require("mongoose");
const db_con = require(path.join(__dirname, "/utils/dbcon"));

const MenuSchema = require(path.join(__dirname, "/models/dbMenu"));

dotenv.config();
const port = process.env.PORT;

app.use(cors()); /* For Cross-Origin server requests */
app.use(express.urlencoded({ extended: true })); //to read req.body.example in app.post for POST methods
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Backend API running");
});

/*Make ASYNC later with error handling*/

/* USER ROUTES */
app.get("/api/menu/:category", async (req, res) => {
  const selectedCategory = req.params.category;
  const fullMenu = await MenuSchema.find({ category: selectedCategory }).sort({
    subcategory: "ascending",
  });
  res.json(fullMenu);
});

/* STAFF & ADMIN ROUTES */
app.get("/api/management/menu", async (req, res) => {
  const fullMenu = await MenuSchema.find({}).sort({ subcategory: "ascending" });
  res.json(fullMenu);
});

app.post("/api/management/menu", async (req, res) => {
  const new_menuItem = new MenuSchema(req.body.menuItem);
  const savedMenuItem = await new_menuItem.save();
  res.json(savedMenuItem);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
