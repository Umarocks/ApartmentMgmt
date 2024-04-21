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

router.post("/logout", ensureAuthenticated, (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "logged out" });
  });
});
module.exports = router;
