const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const db_con = require(path.join(__dirname, "/utils/dbcon"));

const MenuSchema = require(path.join(__dirname, "/models/dbMenu"));

app.use(express.urlencoded({ extended: true })); //to read req.body.example in app.post for POST methods
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API running");
});

/*Make ASYNC later with error handling*/
app.get("/api/menu", async (req, res) => {
  const fullMenu = await MenuSchema.find({});
  res.json(fullMenu);
});

app.post("/api/menu", async (req, res) => {
  console.log(req.body);
  const new_menuItem = new MenuSchema(req.body.menuItem);
  await new_menuItem.save();
  res.send("saved");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
