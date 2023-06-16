const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const mongoose = require("mongoose");
const db_con = require(path.join(__dirname, "/utils/dbcon"));

const MenuSchema = require(path.join(__dirname, "/models/dbMenu"));

app.use(cors()); /* For Cross-Origin server requests */
app.use(express.urlencoded({ extended: true })); //to read req.body.example in app.post for POST methods
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Backend API running");
});

/*Make ASYNC later with error handling*/

/* USER ROUTES */
app.get("/api/menu", async (req, res) => {
  const fullMenu = await MenuSchema.find({}).sort({ subcategory: "ascending" });
  res.json(fullMenu);
});

/* STAFF & ADMIN ROUTES */
app.get("/api/management/menu", async (req, res) => {
  const fullMenu = await MenuSchema.find({}).sort({ subcategory: "ascending" });
  res.json(fullMenu);
});

app.post("/api/management/menu", async (req, res) => {
  console.log(req.body.menuItem);
  const new_menuItem = new MenuSchema(req.body.menuItem);
  await new_menuItem.save();
  res.send("saved " + new_menuItem._id); /* Change to json later */
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
