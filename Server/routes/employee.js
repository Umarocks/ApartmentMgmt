const { adminController } = require("../controllers/adminController");
const { IsEmployee } = require("../middleware/IsEmployee");
var express = require("express");
var router = express.Router();
const pool = require("../db");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/LoginChecker");

// Employee can see all the complaints.
router.get(
  "/getAllComplaint",
  ensureAuthenticated,
  IsEmployee,
  adminController.getAllComplaints
);
// Employee can see Total number of Complaints
router.get(
  "/getAllComplaint",
  ensureAuthenticated,
  IsEmployee,
  adminController.getTotalComplaints
);
module.exports = router;
