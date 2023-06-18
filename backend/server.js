const dotenv = require("dotenv");

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const methodOverride = require("method-override");
const expressError = require(path.join(__dirname, "/utils/ExpressError"));
const mongoSanitize = require("express-mongo-sanitize");
// const helmet = require("helmet");

const mongoose = require("mongoose");
const db_con = require(path.join(__dirname, "/utils/dbcon"));

const menuRoutes = require(path.join(__dirname, "/routes/menuRoutes"));
const manageRoutes = require(path.join(__dirname, "/routes/manageRoutes"));

dotenv.config();
const port = process.env.PORT;

// TO SANITIZE MONGO QUERIES IN URL
app.use(mongoSanitize());

app.use(cors()); /* For Cross-Origin server requests */
app.use(methodOverride("_method")); /* To process PUT & DELETE requests */
app.use(express.urlencoded({ extended: true })); //to read req.body.example in app.post for POST methods
app.use(express.static("public"));

/* Main Routes */
app.use("/api/menu", menuRoutes);
app.use("/api/management", manageRoutes);

/* Basic Route */
app.get("/", (req, res) => {
  res.send("Backend API running");
});

/* all, error, listen */
app.all("*", (req, res, next) => {
  next(new expressError("Page doesn't exist", 404));
});

app.use((err, req, res, next) => {
  const { message = "Unknown Error", statusCode = 500 } = err;
  res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
