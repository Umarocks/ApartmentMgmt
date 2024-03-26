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

module.exports = router;
