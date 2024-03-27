var express = require("express");
var router = express.Router();
const passport = require("passport");
//signup

//login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/addTodo",
    failureMessage: true,
  }),
  async (req, res) => {
    if (req.isAuthenticated()) {
      console.log("Endpt hit");
      res.redirect("/auth/home");

      next();
    }
  }
);

router.get("/logout", (req, res, next) => {
  console.log(req.header["authorization"]);
  res.clearCookie();
  req.logout(function (err) {
    console.log(err);
    req.session.destroy(function (err) {
      res.render("home");
    });
  });
  console.log("logged out");
});
module.exports = router;
