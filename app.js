var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog");
var coolRouter = require("./routes/cool");
// var wikiRouter = require("./wiki.js");
var app = express();

var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://Aayush:aayush1108@cluster0.na6zn.mongodb.net/local_library?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
// set the views value to specify the folder where the templates will be stored
app.set("views", path.join(__dirname, "views"));
// set the view engine value to specify the template library
app.set("view engine", "pug");

//call app.use() to add the middleware libraries into the request handling chain
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//express.static middleware to serve all static files in the /public directory
app.use(express.static(path.join(__dirname, "public")));

//define particular routes for different parts of the site
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);
app.use("/users/cool", coolRouter);
// app.use("/wiki", wikiRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
