const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const cookieSession = require("cookie-session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const ownerRouter = require("./routes/owner");
const tenantRouter = require("./routes/tenant");
const employeeRouter = require("./routes/employee");

const app = express();
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
//set view engine to ejs
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    secret: "mySecretKey",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/LocalStratergy");

app.use("/users", usersRouter);
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.use("/owner", ownerRouter);
app.use("/tenant", tenantRouter);
app.use("/employee", employeeRouter);

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
