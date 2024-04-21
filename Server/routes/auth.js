var express = require("express");
var router = express.Router();
const passport = require("passport");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/LoginChecker");
//signup

//login
router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  async (req, res) => {
    if (req.isAuthenticated()) {
      console.log("Endpt hit");
      console.log(JSON.stringify(res.cookie));
      res.cookie("yourCookieName", req.user.email);
      console.log("Cookie set:", req.cookies);
      res.status(200).json({
        auth: true,
        data: {
          email: req.user.email,
          role: req.user.role,
        },
      });
    }
  }
);

router.get("/logout", ensureAuthenticated, (req, res, next) => {
  console.log(req.cookies);
  res.clearCookie();
  req.logout(function (err) {
    console.log(err);
    req.session.destroy(function (err) {
      res.render("home");
    });
  });
  console.log("logged out");
  res.status(200).json({ message: "logged out" });
});
module.exports = router;
