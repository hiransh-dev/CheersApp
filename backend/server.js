const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");

/* CORS */
// const cors = require("cors");
// app.use(cors());

const expressError = require(path.join(__dirname, "/utils/ExpressError"));
const catchAsync = require(path.join(__dirname, "/utils/catchAsync"));
const mongoSanitize = require("express-mongo-sanitize");
// const helmet = require("helmet");

const mongoose = require("mongoose");
const db_con = require(path.join(__dirname, "/utils/dbcon"));
const User = require(path.join(__dirname, "/models/dbUsers"));

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const MongoStore = require("connect-mongo");

const menuRoutes = require(path.join(__dirname, "/routes/menuRoutes"));
const manageRoutes = require(path.join(__dirname, "/routes/manageRoutes"));
const userRoutes = require(path.join(__dirname, "/routes/userRoutes"));
const orderRoutes = require(path.join(__dirname, "/routes/orderRoutes"));

// TO SANITIZE MONGO QUERIES IN URL
app.use(mongoSanitize());

app.use(methodOverride("_method")); /* To process PUT & DELETE requests */
app.use(express.urlencoded({ extended: true })); //to read req.body.example in app.post for POST methods
app.use(express.static("public"));

/* Mongo Session Store */
const store = new MongoStore({
  mongoUrl: process.env.DB_URL,
  secret: process.env.SESSION_SECRET,
  touchAfter: 24 * 60 * 60, //24 hours
});
store.on("error", function (e) {
  console.log("Session Store Error", e);
});
/* Passport Setup with local */
const sessionConfig = {
  store, //Using Mongo Session Store
  name: "session" /* NOT REQUIRED, JUST TO CHANGE SESSION NAME */,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // + (milliseconds*seconds*minutes*hours*days) 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

/* Main Routes */
app.use("/api/menu", menuRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/manage", manageRoutes);

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
  console.log(message, statusCode, err.stack);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
